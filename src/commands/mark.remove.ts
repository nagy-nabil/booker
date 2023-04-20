import * as vscode from "vscode";
import { WorkspaceState } from "../workspaceState";

export function bookerMarkRemove(state: WorkspaceState): vscode.Disposable {
    return vscode.commands.registerCommand("booker.mark.remove", async () => {
        const textEditor = vscode.window.activeTextEditor;
        if (textEditor === undefined) {
            console.log("no active text editor");
            return;
        }
        const doc = textEditor.document;
        await state.removeMark(doc.uri);
    });
}
