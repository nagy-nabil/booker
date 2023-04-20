import * as vscode from "vscode";
import { storeKey } from "./config";

/**
 * class that would hold the state for the current workspace, like opened editors[marked] update the state, manage context.workspaceState
 */
export class WorkspaceState {
    // todo is it better to use only map? instead of array and set
    private _vsStore: string[];
    private _editors!: vscode.TextDocument[];
    // will be used to fast check marked files so need to be always synced with _editors
    private _editorsSet: Set<string>;
    private _context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this._context = context;
        // read URIs from context.state then load those uris to TextEditor
        this._vsStore = this._context.workspaceState.get(storeKey) || [];
        this._editors = [];
        console.log(
            "🪵 [workspaceState.ts:18] ~ token ~ \x1b[0;32mthis._vsStore\x1b[0m = ",
            this._vsStore
        );
        this._editorsSet = new Set(this._vsStore);
        this._vsStore.forEach(async (val) => {
            const doc = await vscode.workspace.openTextDocument(
                vscode.Uri.file(val)
            );
            this._editors.push(doc);
        });
    }

    // todo take textdocument from input
    async addMark(doc: vscode.TextDocument, uri: vscode.Uri) {
        if (this._editorsSet.has(uri.fsPath)) {
            console.log("didnt saved new Mark because i already have it");
            return;
        }
        this._editors.push(doc);
        this._editorsSet.add(uri.fsPath);
        this._vsStore.push(uri.fsPath);
        await this.updateWorkspaceStore();
    }

    async removeMark(uri: vscode.Uri) {
        if (this._editorsSet.delete(uri.fsPath)) {
            const index = this._vsStore.findIndex((val) => val === uri.fsPath);
            this._vsStore.splice(index, 1);
        }
        await this.updateWorkspaceStore();
    }

    /**
     * update vscode workspace store, to be synced with this._vsStore
     */
    async updateWorkspaceStore() {
        await this._context.workspaceState.update(storeKey, this._vsStore);
    }

    get store(): string[] {
        return this._vsStore;
    }

    /**
     * change workspace visible text editor by its id[index stored in the store], id zero indexed
     * @param id number
     * @returns
     */
    async changeEditor(id: number) {
        if (id >= 0 && id < this._editors.length) {
            await vscode.window.showTextDocument(this._editors[id]);
        }
        return;
    }
}
