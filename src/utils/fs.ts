import * as vscode from "vscode";
import { storageFileName } from "../config";

/**
 * handle fs storge if not exist create it and return its path
 */
export async function storgeHandler(
    workspaceFs: vscode.FileSystem,
    wsUri: vscode.Uri
): Promise<vscode.Uri> {
    // create storge
    await workspaceFs.createDirectory(wsUri);
    // write empty file
    const uriPath = vscode.Uri.joinPath(wsUri, storageFileName);
    await workspaceFs.writeFile(uriPath, new Uint8Array());
    return uriPath;
}
