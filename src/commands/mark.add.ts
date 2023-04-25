import * as vscode from "vscode";
import { WorkspaceState } from "../workspaceState";

export function bookerMarkAdd(state: WorkspaceState): vscode.Disposable {
    return vscode.commands.registerCommand("booker.mark.add", async () => {
        const textEditor = vscode.window.activeTextEditor;
        if (textEditor === undefined) {
            console.log("no active text editor");
            return;
        }
        await state.addMark(textEditor.document.uri);
    });
}
