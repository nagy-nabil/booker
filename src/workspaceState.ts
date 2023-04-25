import * as vscode from "vscode";
import { storeKey } from "./config";

/**
 * class that would hold the state for the current workspace, like opened editors[marked] update the state, manage context.workspaceState, fs store
 */
export class WorkspaceState {
    // todo is it better to use only map? instead of array and set
    private _vsStore!: string[];
    // will be used to fast check marked files so need to be always synced with _editors
    private _editorsSet!: Set<string>;
    private _context: vscode.ExtensionContext;
    private _fsStorgePath: vscode.Uri; // folder path not file

    constructor(context: vscode.ExtensionContext, fsStoragePath: vscode.Uri) {
        this._context = context;
        this._fsStorgePath = fsStoragePath;
        // read URIs from context.state then load those uris to TextEditor
        this.vsStore = this._context.workspaceState.get(storeKey) || [];
    }

    // todo take textdocument from input
    async addMark(uri: vscode.Uri) {
        if (this._editorsSet.has(uri.fsPath)) {
            console.log("didnt saved new Mark because i already have it");
            return;
        }
        this._editorsSet.add(uri.fsPath);
        this._vsStore.push(uri.fsPath);
        await this._updateWorkspaceStore();
    }

    async removeMark(uri: vscode.Uri) {
        if (this._editorsSet.delete(uri.fsPath)) {
            const index = this._vsStore.findIndex((val) => val === uri.fsPath);
            this._vsStore.splice(index, 1);
        }
        await this._updateWorkspaceStore();
    }

    /**
     * update vscode workspace store, to be synced with this._vsStore
     */
    private async _updateWorkspaceStore() {
        await this._context.workspaceState.update(storeKey, this._vsStore);
    }

    /**
     * return list of marked fs paths
     */
    get vsStore(): string[] {
        return this._vsStore;
    }

    /**
     * set vsStore to new content why in setter? to keep editorsSet syncked with it so i don't have to type more line
     */
    set vsStore(newContent: string[]) {
        this._vsStore = newContent;
        this._editorsSet = new Set(this._vsStore);
    }

    /**
     * maybe activiting GC way too much but whatever
     * @param newContent
     */
    async setstore(newContent: string[]) {
        this.vsStore = newContent;
        await this._updateWorkspaceStore();
    }

    /**
     * change workspace visible text editor by its id[index stored in the store], id zero indexed
     * @param id number
     * @returns
     */
    async changeEditor(id: number) {
        const doc = await vscode.workspace.openTextDocument(this._vsStore[id]);
        await vscode.window.showTextDocument(doc);
        return;
    }

    get fsStoragePath(): vscode.Uri {
        return this._fsStorgePath;
    }
}
