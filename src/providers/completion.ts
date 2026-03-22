/**
 * Completion provider — autocomplete for axag-* attributes and enum values.
 */

import * as vscode from 'vscode';
import { AXAG_ATTRIBUTES, getAttributeNames } from '../data/attributes.js';

const LANGUAGES = ['html', 'javascriptreact', 'typescriptreact'];

export function registerCompletionProvider(context: vscode.ExtensionContext): void {
  const provider = vscode.languages.registerCompletionItemProvider(
    LANGUAGES.map(l => ({ language: l })),
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
      ): vscode.CompletionItem[] | undefined {
        const lineText = document.lineAt(position).text;
        const linePrefix = lineText.substring(0, position.character);

        // Check if we're inside a tag (between < and >)
        const lastOpenTag = linePrefix.lastIndexOf('<');
        const lastCloseTag = linePrefix.lastIndexOf('>');
        if (lastOpenTag < 0 || lastCloseTag > lastOpenTag) {
          return undefined;
        }

        // Check if we're typing an attribute value (inside quotes after =)
        const valueMatch = linePrefix.match(/axag-([\w-]+)=["']([^"']*)$/);
        if (valueMatch) {
          const attrName = `axag-${valueMatch[1]}`;
          return getValueCompletions(attrName);
        }

        // Check if we're typing an attribute name starting with "axag"
        const attrMatch = linePrefix.match(/\s(axag[\w-]*)$/);
        if (attrMatch) {
          return getAttributeCompletions(attrMatch[1]);
        }

        // Check if we're at a space inside a tag (suggest all attributes)
        if (linePrefix.match(/\s$/)) {
          return getAttributeCompletions('');
        }

        return undefined;
      },
    },
    '-', // trigger on hyphen for axag-
    '"', // trigger on opening quote for values
    "'",
  );

  context.subscriptions.push(provider);
}

function getAttributeCompletions(prefix: string): vscode.CompletionItem[] {
  return getAttributeNames()
    .filter(name => name.startsWith(prefix))
    .map(name => {
      const info = AXAG_ATTRIBUTES[name];
      const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
      item.detail = info.required ? '(required)' : '(optional)';
      item.documentation = new vscode.MarkdownString(
        `**${name}**\n\n${info.description}\n\n${info.detail || ''}`,
      );

      // Insert with ="..." for simple values, or ='...' for JSON
      if (info.valueType === 'json-array' || info.valueType === 'json-object') {
        item.insertText = new vscode.SnippetString(`${name}='\${1}'`);
      } else if (info.enum) {
        item.insertText = new vscode.SnippetString(`${name}="\${1|${info.enum.join(',')}|}"`);
      } else {
        item.insertText = new vscode.SnippetString(`${name}="\${1}"`);
      }

      // Required attributes sort first
      item.sortText = info.required ? `0_${name}` : `1_${name}`;

      return item;
    });
}

function getValueCompletions(attrName: string): vscode.CompletionItem[] | undefined {
  const info = AXAG_ATTRIBUTES[attrName];
  if (!info?.enum) return undefined;

  return info.enum.map(value => {
    const item = new vscode.CompletionItem(value, vscode.CompletionItemKind.EnumMember);
    item.detail = attrName;
    return item;
  });
}
