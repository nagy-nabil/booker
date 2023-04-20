import * as vscode from "vscode";
import { WorkspaceState } from "../workspaceState";

export function bookerMarkShow(state: WorkspaceState): vscode.Disposable {
    return vscode.commands.registerCommand("booker.mark.show", async () => {
        const options = state.store.map((val, i) => {
            return `${i + 1} - ${val}`;
        });

        const selection = await vscode.window.showQuickPick(options, {
            canPickMany: false,
            title: "booker-marks",
        });

        if (selection !== undefined) {
            const parsedIndex = +selection[0];
            await state.changeEditor(parsedIndex - 1);
        }
    });
}
