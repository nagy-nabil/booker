import * as vscode from "vscode";
import { storageFileName } from "../config";

/**
 * check for existance of the storge folder with store file if not exist create it
 */
export async function initStorge(
    workspaceFs: vscode.FileSystem,
    uri: vscode.Uri
) {
    try {
        const content = await workspaceFs.stat(uri);
        console.log(
            "🪵 [fsUtils.ts:6] ~ token ~ \x1b[0;32mcontent\x1b[0m = ",
            content
        );
    } catch (err) {
        if (
            err instanceof vscode.FileSystemError &&
            err.code === "FileNotFound"
        ) {
            console.log(err.code);
            // create storge
            await workspaceFs.createDirectory(uri);
            await workspaceFs.writeFile(
                vscode.Uri.joinPath(uri, storageFileName),
                new Uint8Array([1, 2])
            );
            console.log(
                "storge was not found and created folder for it, and file for storage called",
                storageFileName
            );
        }
    }
}
