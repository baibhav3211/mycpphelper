"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function activate(context) {
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
function deactivate() { }
//# sourceMappingURL=extension.js.map