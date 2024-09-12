import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.createCppFile', async () => {
        // Ask for the file name
        const fileName = await vscode.window.showInputBox({
            prompt: 'Enter the name of the .cpp file',
            placeHolder: 'example: myFile'
        });

        if (!fileName) {
            vscode.window.showErrorMessage('File name is required');
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        // Define the path to the template file (you can change this path accordingly)
        const templateFilePath = path.join(context.extensionPath, 'template.txt');

        // Read the C++ template from the file
        fs.readFile(templateFilePath, 'utf8', (err, data) => {
            if (err) {
                vscode.window.showErrorMessage('Failed to read template file: ' + err.message);
                return;
            }

            // Create the full file path for the new .cpp file
            const filePath = path.join(workspaceFolders[0].uri.fsPath, `${fileName}.cpp`);

            // Write the template to the new .cpp file
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    vscode.window.showErrorMessage('Failed to create file: ' + err.message);
                    return;
                }

                vscode.window.showInformationMessage(`Created ${fileName}.cpp`);

                // Open the file in the editor
                vscode.workspace.openTextDocument(filePath).then((document) => {
                    vscode.window.showTextDocument(document);
                });
            });
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
