/**
 * Status bar provider — shows AXAG annotation count in the editor status bar.
 *
 * Displays a counter like "⚡ AXAG: 5 annotations" that updates on file open/change.
 * Clicking it runs the "axag.countAnnotations" command.
 */

import * as vscode from 'vscode';

const AXAG_ATTR_REGEX = /axag-intent\s*=\s*["']/g;

let statusBarItem: vscode.StatusBarItem;

export function registerStatusBar(context: vscode.ExtensionContext): void {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  statusBarItem.command = 'axag.countAnnotations';
  context.subscriptions.push(statusBarItem);

  // Register count command
  context.subscriptions.push(
    vscode.commands.registerCommand('axag.countAnnotations', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('AXAG: No active editor');
        return;
      }
      const count = countAnnotations(editor.document);
      if (count === 0) {
        vscode.window.showInformationMessage(
          'No AXAG annotations found. Type `axag-` inside an HTML element to get started!',
        );
      } else {
        vscode.window.showInformationMessage(
          `Found ${count} AXAG annotation${count === 1 ? '' : 's'} in this file.`,
        );
      }
    }),
  );

  // Update on editor change
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
  );
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (vscode.window.activeTextEditor?.document === e.document) {
        updateStatusBar(vscode.window.activeTextEditor);
      }
    }),
  );

  // Initial update
  updateStatusBar(vscode.window.activeTextEditor);
}

function updateStatusBar(editor: vscode.TextEditor | undefined): void {
  if (!editor || !isSupported(editor.document)) {
    statusBarItem.hide();
    return;
  }

  const count = countAnnotations(editor.document);
  statusBarItem.text = `$(zap) AXAG: ${count}`;
  statusBarItem.tooltip = count === 0
    ? 'No AXAG annotations — click to learn more'
    : `${count} AXAG annotation${count === 1 ? '' : 's'} in this file`;
  statusBarItem.show();
}

function countAnnotations(doc: vscode.TextDocument): number {
  const text = doc.getText();
  const matches = text.match(AXAG_ATTR_REGEX);
  return matches ? matches.length : 0;
}

function isSupported(doc: vscode.TextDocument): boolean {
  return ['html', 'javascriptreact', 'typescriptreact'].includes(doc.languageId);
}
