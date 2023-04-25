import * as vscode from "vscode";

/**
 * handle fs storge if not exist create it and return its path
 */
export async function storgeHandler(
    workspaceFs: vscode.FileSystem,
    wsUri: vscode.Uri
): Promise<void> {
    // create storge
    await workspaceFs.createDirectory(wsUri);
}
