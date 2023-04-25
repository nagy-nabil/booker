import * as vscode from "vscode";
import { WorkspaceState } from "../workspaceState";
import { storageFileName } from "../config";

// TODO is creaing and deleting fs editor each time better or closing tha tab only and insert with condition [the down side of this you won't know when to not listen to change event]

/**
 * create file and fill it with stored marks
 */
async function initEditor(
    state: WorkspaceState,
    fsEdirorUri: vscode.Uri
): Promise<void> {
    // cannot use workspace.fs.write because when calling openTextDocument might load old value of BookerEditors because it wasn't close yet from the workspace so need workspace edit to overwrite the document if exist
    const wsEdit = new vscode.WorkspaceEdit();
    wsEdit.createFile(fsEdirorUri, { overwrite: true });
    await vscode.workspace.applyEdit(wsEdit);
    // load file that is unique to the workspace
    const doc = await vscode.workspace.openTextDocument(fsEdirorUri);
    const editor = await vscode.window.showTextDocument(doc);
    // fill the editor with saved marks, from first position always
    const pos = new vscode.Position(0, 0);
    await editor.edit((editBuilder) => {
        editBuilder.insert(pos, state.vsStore.join("\n"));
    });
    // save the first time because the autosave won't be enabled yet
    await doc.save();
}

// todo i hate it
function assignListeners(state: WorkspaceState, fsEdirorUri: vscode.Uri): void {
    // enable autosave for our editor only
    const onchangeDisposale = vscode.workspace.onDidChangeTextDocument(
        async (tdoc) => {
            if (tdoc.document.fileName.includes(storageFileName)) {
                await tdoc.document.save();
                await state.setstore(
                    tdoc.document
                        .getText()
                        .split("\n")
                        .filter(
                            (val) =>
                                val.startsWith("/") ||
                                val.startsWith("c:") ||
                                val.startsWith("C:")
                        )
                );
            }
        }
    );

    // visible textEditors are the one that shown in the screen not all tabs [the ones you can see their content]
    const changeVisibleDisposable = vscode.window.onDidChangeVisibleTextEditors(
        async (tdocs) => {
            if (
                tdocs.findIndex((val) =>
                    val.document.fileName.includes(storageFileName)
                ) === -1
            ) {
                await cleanUp(fsEdirorUri);
            }
        }
    );

    const closeEditorDisposable = vscode.workspace.onDidCloseTextDocument(
        async (tdoc) => {
            if (tdoc.fileName.includes(storageFileName)) {
                await cleanUp(fsEdirorUri);
            }
        }
    );

    /**
     * remove event listners and delete fs editor IN ORDER
     */
    async function cleanUp(fsEdirorUri: vscode.Uri): Promise<void> {
        onchangeDisposale.dispose();
        changeVisibleDisposable.dispose();
        await vscode.workspace.fs.delete(fsEdirorUri);
    }
}

export function bookerUiShow(state: WorkspaceState): vscode.Disposable {
    const fsEdirorUri = vscode.Uri.joinPath(
        state.fsStoragePath,
        storageFileName
    );
    return vscode.commands.registerCommand("booker.ui.show", async () => {
        await initEditor(state, fsEdirorUri);
        assignListeners(state, fsEdirorUri);
    });
}
