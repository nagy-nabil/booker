import * as vscode from "vscode";
import { WorkspaceState } from "../workspaceState";

export function bookerUiToggle(state: WorkspaceState): vscode.Disposable {
    return vscode.commands.registerCommand("booker.ui.toggle", async () => {
        // load file that is unique to the workspace
        // TODO FIX it's not working
        await state.resetFsStore();
        const doc = await vscode.workspace.openTextDocument(
            state.fsStoragePath
        );
        const editor = await vscode.window.showTextDocument(doc);
        // listen to events save/close to update saved marks
        // TODO use disposables to remove event listeners when you close the editor
        // TODO when user close Booker ui editor, remove the file or at least reset it
        const onchangeDisposale = vscode.workspace.onDidChangeTextDocument(
            async (tdoc) => {
                if (tdoc.document.fileName.includes("BookerEditors")) {
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
        // fill the editor with saved marks, from first position always
        const pos = new vscode.Position(0, 0);
        await editor.edit((editBuilder) => {
            editBuilder.insert(pos, state.store.join("\n"));
        });
    });
}
