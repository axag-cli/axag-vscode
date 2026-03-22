/**
 * AXAG VS Code Extension — autocomplete, hover docs, diagnostics, snippets, and status bar.
 */

import * as vscode from 'vscode';
import { registerCompletionProvider } from './providers/completion.js';
import { registerHoverProvider } from './providers/hover.js';
import { registerDiagnosticsProvider } from './providers/diagnostics.js';
import { registerStatusBar } from './providers/statusbar.js';

export function activate(context: vscode.ExtensionContext): void {
  console.log('AXAG extension activated');

  registerCompletionProvider(context);
  registerHoverProvider(context);
  registerDiagnosticsProvider(context);
  registerStatusBar(context);
}

export function deactivate(): void {
  // no-op
}
