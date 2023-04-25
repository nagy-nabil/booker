import * as vscode from "vscode";
import { storgeHandler } from "./utils/fs";
import { WorkspaceState } from "./workspaceState";
import { bookerMarkShow } from "./commands/mark.show";
import { bookerMarkAdd } from "./commands/mark.add";
import { bookerMarkRemove } from "./commands/mark.remove";
import { bookerMarkJumpI } from "./commands/mark.jump.i";
import { bookerUiToggle } from "./commands/ui.toggle";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    // init fs store
    if (context.storageUri === undefined) {
        return;
    }
    let fsStoragePath: vscode.Uri = context.storageUri;
    if (context.storageUri) {
        await storgeHandler(vscode.workspace.fs, context.storageUri);
    }

    // init vs store
    const workspaceState = new WorkspaceState(context, fsStoragePath);

    context.subscriptions.push(bookerMarkAdd(workspaceState));
    context.subscriptions.push(bookerMarkRemove(workspaceState));
    context.subscriptions.push(bookerMarkShow(workspaceState));
    context.subscriptions.push(bookerMarkJumpI(workspaceState, 0));
    context.subscriptions.push(bookerMarkJumpI(workspaceState, 1));
    context.subscriptions.push(bookerMarkJumpI(workspaceState, 2));
    context.subscriptions.push(bookerUiToggle(workspaceState));
}

// This method is called when your extension is deactivated
export function deactivate() {}
