# Booker

## WIP

extension inspired by [ThePrimeagen/harpoon](https://github.com/ThePrimeagen/harpoon), it gives you the ability to mark files to move between them blazingly fast, so simply move between files with the lsp then return to the important ones -without fuzzy finder- again blazingly fast!

## Features

- marks per workspace

- mark active file `booker.mark.add`

- remove the mark from active file `booker.mark.remove`

- show all marked files through vscode quickPick `booker.mark.show`

- hard coded jumps

  - jump to file at index 0 `booker.mark.jump1`

  - jump to file at index 0 `booker.mark.jump2`

  - jump to file at index 0 `booker.mark.jump3`

## TODOS

- [x] delete mark

- [x] user should be able to reoreder the marks through some UI

- [x] figure out how to use vscode datastorge to store information for the extension per workspace

- [ ] global marks

- [ ] use disposables to remove event listeners when you close the editor

- [ ] when user close Booker ui editor, remove the file or at least reset it

## Extension Settings

| Command           | Title                                        | Default Shortcut |
| ----------------- | -------------------------------------------- | ---------------- |
| booker.mark.add   | booker: add mark at current active editor    | TBD              |
| booker.mark.remove| booker: remove mark from current active editor| TBD              |
| booker.mark.show  | booker: show quick pick for all marked files | TBD              |
| booker.mark.jump1 | booker: jump to first mark                   | TBD              |
| booker.mark.jump2 | booker: jump to second mark                  | TBD              |
| booker.mark.jump3 | booker: jump to third mark                   | TBD              |
| booker.ui.toggle  | booker: show booker ui                        | TBD              |

### vscodevim keybindings example

  ```json
        {
            "before": ["<leader>", "a"],
            "commands": ["booker.mark.add"]
        },
        {
            "before": ["<leader>", "r"],
            "commands": ["booker.mark.remove"]
        },
        {
            "before": ["<leader>", "1"],
            "commands": ["booker.mark.jump1"]
        },
        {
            "before": ["<leader>", "2"],
            "commands": ["booker.mark.jump2"]
        },
        {
            "before": ["<leader>", "3"],
            "commands": ["booker.mark.jump3"]
        }
  ```

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
