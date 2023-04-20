// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { initStorge } from "./utils/fs";
import { WorkspaceState } from "./workspaceState";
import { bookerMarkShow } from "./commands/mark.show";
import { bookerMarkAdd } from "./commands/mark.add";
import { bookerMarkRemove } from "./commands/mark.remove";
import { bookerMarkJumpI } from "./commands/mark.jump.i";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    // init disk store
    // if (context.storageUri) {
    //     console.log(context.storageUri.fsPath);
    //     await initStorge(vscode.workspace.fs, context.storageUri);
    // }

    // init vs store
    const workspaceState = new WorkspaceState(context);

    context.subscriptions.push(bookerMarkAdd(workspaceState));
    context.subscriptions.push(bookerMarkRemove(workspaceState));
    context.subscriptions.push(bookerMarkShow(workspaceState));
    context.subscriptions.push(bookerMarkJumpI(workspaceState, 0));
    context.subscriptions.push(bookerMarkJumpI(workspaceState, 1));
    context.subscriptions.push(bookerMarkJumpI(workspaceState, 2));
}

// This method is called when your extension is deactivated
export function deactivate() {}
