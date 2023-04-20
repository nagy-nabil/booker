import * as vscode from "vscode";
import { WorkspaceState } from "../workspaceState";

/**
 * generic jump to index I disposal, id zero indexed, and the command itself would be id + 1
 * @param state
 * @param id number
 * @returns
 */
export function bookerMarkJumpI(
    state: WorkspaceState,
    id: number
): vscode.Disposable {
    return vscode.commands.registerCommand(
        `booker.mark.jump${id + 1}`,
        async () => {
            await state.changeEditor(id);
        }
    );
}
