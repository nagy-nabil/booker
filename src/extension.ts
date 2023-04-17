// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

type MarksStoreItem = [vscode.Uri, vscode.Position];
type MarksStore = (MarksStoreItem | null)[];
let globalSavedPos: vscode.Position;
let globalSavedFileUri: vscode.Uri;
// TODO make the store in some better place? data storge?
const flags = new Set<string>();
let freeIndex = 0;
const marks: MarksStore = new Array(3).fill(null);

function insertMark(store: MarksStore, mark: MarksStoreItem) {
    if (freeIndex >= 3 || flags.has(mark[0].toString())) {
        console.log("didnt saved new items someting against me idk");
        // already stored 3 marks don't store any new
        // mark already exist dont add it again
        return;
    }
    flags.add(mark[0].toString());
    store[freeIndex++] = mark;
}

// function removeMark(store: MarksStore, markIndex: number) {
//     // TODO store length is hard coded fix this shit
//     if (markIndex >= 3) {
//         // cannot remove something i don't have
//         return;
//     }
//     store[markIndex] = null;
//     // TODO how to integrate this with freeIndex and the holes you would leave in the array
// }

function showAllMarks(marks: MarksStore) {
    const options = marks
        .filter((v) => {
            return v === null ? false : true;
        })
        .map((v, i) => {
            return (v as MarksStoreItem)[0].path + " - " + i.toString();
        });
    console.log(marks);
    console.log(options);
    vscode.window
        .showQuickPick(options, {
            canPickMany: false,
            title: "booker-marks",
        })
        .then((selection) => {
            if (selection !== undefined) {
                const parsedIndex = +selection[selection.length - 1];
                console.log(`user choosed to go to ${selection}`);
                console.log(`index ${parsedIndex}`);
                jumpToMark(marks, parsedIndex);
            }
        });
}

async function jumpToMark(store: MarksStore, markIndex: number) {
    // load and open the saved file
    // TODO jump to correct position
    if (store[markIndex] === null && markIndex >= store.length) {
        // didn't store mark in this index do shit
        // out of index do shit
        return;
        // throw new Error("trying to access out of index");
    }
    const doc = await vscode.workspace.openTextDocument(
        (store[markIndex] as MarksStoreItem)[0]
    );
    vscode.window.showTextDocument(doc, {});
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "booker" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        "booker.mark.append",
        () => {
            // The code you place here will be executed every time your command is executed
            // Display a message box to the user
            vscode.window.showInformationMessage("Hello World from booker!");
            const textEditor = vscode.window.activeTextEditor;

            // how to get the current position if no text editor so leave if no one
            if (textEditor === undefined) {
                return;
            }
            const doc = textEditor.document;
            // store uri globallay
            globalSavedFileUri = doc.uri;

            const position = textEditor.selection.active;
            // store pos globally
            globalSavedPos = position;

            //save in the store
            insertMark(marks, [doc.uri, position]);

            console.log(
                `i saved file ${globalSavedFileUri.fsPath} at line at ${globalSavedPos.line}`
            );

            // vscode.workspace.onWillSaveTextDocument((e) => {
            //     console.log(`file ${e.document.uri} saved`);
            //     if (
            //         e.document.uri.toString() === globalSavedFileUri.toString()
            //     ) {
            //         console.log("saved the global");
            //     }
            // });

            // vscode.workspace.onDidCloseTextDocument

            //
            // vscode.window.onDidChangeActiveTextEditor((e) => {
            //     if (e === undefined) {
            //         return;
            //     }

            //     console.log(`went to file ${e.document.uri}`);
            //     if (
            //         e.document.uri.toString() !== globalSavedFileUri.toString()
            //     ) {
            //         console.log("it's not the same as global one");
            //         console.log(
            //             `doc last pos before moving to another file is ${textEditor.selection.active}`
            //         );
            //     }
            // });
        }
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable2 = vscode.commands.registerCommand(
        "booker.mark.jump",
        async () => {
            // The code you place here will be executed every time your command is executed
            // Display a message box to the user
            vscode.window.showInformationMessage("jumping?");
            console.log(
                `i must jump to ${globalSavedFileUri.path} to line ${globalSavedPos.line}`
            );
        }
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable3 = vscode.commands.registerCommand(
        "booker.marks.show",
        async () => {
            // The code you place here will be executed every time your command is executed
            // Display a message box to the user
            vscode.window.showInformationMessage("show all marks?");
            showAllMarks(marks);
        }
    );

    // just as day one i will create hard coded commands to go to certain index in the store 0 -> 2 [1->3]
    let goto0 = vscode.commands.registerCommand(
        "booker.mark.jump-fir",
        async () => {
            // The code you place here will be executed every time your command is executed
            // Display a message box to the user
            vscode.window.showInformationMessage("goto mark number 1");
            await jumpToMark(marks, 0);
        }
    );

    // just as day one i will create hard coded commands to go to certain index in the store 0 -> 2 [1->3]
    let goto1 = vscode.commands.registerCommand(
        "booker.mark.jump-sec",
        async () => {
            // The code you place here will be executed every time your command is executed
            // Display a message box to the user
            vscode.window.showInformationMessage("goto mark number 2");
            await jumpToMark(marks, 1);
        }
    );

    // just as day one i will create hard coded commands to go to certain index in the store 0 -> 2 [1->3]
    let goto2 = vscode.commands.registerCommand(
        "booker.mark.jump-thrd",
        async () => {
            // The code you place here will be executed every time your command is executed
            // Display a message box to the user
            vscode.window.showInformationMessage("goto mark number 1");
            await jumpToMark(marks, 2);
        }
    );

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
    context.subscriptions.push(goto0);
    context.subscriptions.push(goto1);
    context.subscriptions.push(goto2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
