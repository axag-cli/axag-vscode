/**
 * Hover provider — documentation on hover for axag-* attributes.
 */

import * as vscode from 'vscode';
import { AXAG_ATTRIBUTES } from '../data/attributes.js';

const LANGUAGES = ['html', 'javascriptreact', 'typescriptreact'];

export function registerHoverProvider(context: vscode.ExtensionContext): void {
  const provider = vscode.languages.registerHoverProvider(
    LANGUAGES.map(l => ({ language: l })),
    {
      provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
      ): vscode.Hover | undefined {
        const range = document.getWordRangeAtPosition(position, /axag-[\w-]+/);
        if (!range) return undefined;

        const word = document.getText(range);
        const info = AXAG_ATTRIBUTES[word];
        if (!info) return undefined;

        const md = new vscode.MarkdownString();
        md.appendMarkdown(`### \`${word}\`\n\n`);
        md.appendMarkdown(`${info.description}\n\n`);

        if (info.detail) {
          md.appendMarkdown(`${info.detail}\n\n`);
        }

        if (info.enum) {
          md.appendMarkdown(`**Values:** ${info.enum.map(v => `\`${v}\``).join(', ')}\n\n`);
        }

        md.appendMarkdown(`**Required:** ${info.required ? 'Yes' : 'No'}\n`);
        md.appendMarkdown(`**Type:** ${info.valueType}\n`);

        md.appendMarkdown(`\n---\n[AXAG Specification](https://axag.org)`);

        return new vscode.Hover(md, range);
      },
    },
  );

  context.subscriptions.push(provider);
}
