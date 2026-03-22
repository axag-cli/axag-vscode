/**
 * Diagnostics provider — inline validation of axag-* attributes.
 *
 * Provides basic structural validation without requiring axag-lint as a dependency.
 * Checks: required attributes, valid enum values, valid JSON in arrays.
 */

import * as vscode from 'vscode';
import { AXAG_ATTRIBUTES } from '../data/attributes.js';

const LANGUAGES = ['html', 'javascriptreact', 'typescriptreact'];
const DIAGNOSTICS_SOURCE = 'axag';

let diagnosticCollection: vscode.DiagnosticCollection;
let debounceTimer: ReturnType<typeof setTimeout> | undefined;

export function registerDiagnosticsProvider(context: vscode.ExtensionContext): void {
  diagnosticCollection = vscode.languages.createDiagnosticCollection(DIAGNOSTICS_SOURCE);
  context.subscriptions.push(diagnosticCollection);

  // Run on save
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((doc) => {
      if (isSupported(doc)) {
        runDiagnostics(doc);
      }
    }),
  );

  // Run on change (debounced)
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (isSupported(event.document)) {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => runDiagnostics(event.document), 500);
      }
    }),
  );

  // Run on open
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((doc) => {
      if (isSupported(doc)) {
        runDiagnostics(doc);
      }
    }),
  );

  // Run on all currently open documents
  vscode.workspace.textDocuments.forEach((doc) => {
    if (isSupported(doc)) {
      runDiagnostics(doc);
    }
  });
}

function isSupported(doc: vscode.TextDocument): boolean {
  return LANGUAGES.includes(doc.languageId);
}

function runDiagnostics(document: vscode.TextDocument): void {
  const text = document.getText();
  const diagnostics: vscode.Diagnostic[] = [];

  // Find all elements with axag-* attributes
  // Match opening tags with axag attributes
  const tagRegex = /<(\w[\w.-]*)([^>]*axag-[^>]*)>/g;
  let tagMatch;

  while ((tagMatch = tagRegex.exec(text)) !== null) {
    const tagContent = tagMatch[2];
    const tagOffset = tagMatch.index;

    // Extract all axag-* attributes from this tag
    const attrs = new Map<string, { value: string; offset: number }>();
    const attrRegex = /(axag-[\w-]+)\s*=\s*["']([^"']*)["']/g;
    let attrMatch;

    while ((attrMatch = attrRegex.exec(tagContent)) !== null) {
      const name = attrMatch[1];
      const value = attrMatch[2];
      const offset = tagOffset + tagMatch[0].indexOf(attrMatch[0]);
      attrs.set(name, { value, offset });
    }

    // Check: if any axag attribute exists, axag-intent is required
    if (attrs.size > 0 && !attrs.has('axag-intent')) {
      const firstAttr = attrs.values().next().value!;
      const pos = document.positionAt(firstAttr.offset);
      diagnostics.push(
        createDiagnostic(
          new vscode.Range(pos, pos.translate(0, 20)),
          'Missing required attribute: axag-intent',
          vscode.DiagnosticSeverity.Error,
          'AXAG-LINT-001',
        ),
      );
    }

    // Check: if axag-intent exists, axag-entity and axag-action-type are recommended
    if (attrs.has('axag-intent')) {
      if (!attrs.has('axag-entity')) {
        const intentAttr = attrs.get('axag-intent')!;
        const pos = document.positionAt(intentAttr.offset);
        diagnostics.push(
          createDiagnostic(
            new vscode.Range(pos, pos.translate(0, 20)),
            'Missing required attribute: axag-entity (axag-intent without axag-entity)',
            vscode.DiagnosticSeverity.Error,
            'AXAG-LINT-002',
          ),
        );
      }
      if (!attrs.has('axag-action-type')) {
        const intentAttr = attrs.get('axag-intent')!;
        const pos = document.positionAt(intentAttr.offset);
        diagnostics.push(
          createDiagnostic(
            new vscode.Range(pos, pos.translate(0, 20)),
            'Missing required attribute: axag-action-type (axag-intent without axag-action-type)',
            vscode.DiagnosticSeverity.Error,
            'AXAG-LINT-003',
          ),
        );
      }
    }

    // Check enum values
    for (const [name, { value, offset }] of attrs) {
      const info = AXAG_ATTRIBUTES[name];
      if (!info) continue;

      if (info.enum && !info.enum.includes(value)) {
        const pos = document.positionAt(offset);
        diagnostics.push(
          createDiagnostic(
            new vscode.Range(pos, pos.translate(0, name.length + value.length + 3)),
            `Invalid value "${value}" for ${name}. Expected: ${info.enum.join(', ')}`,
            vscode.DiagnosticSeverity.Error,
            name === 'axag-action-type' ? 'AXAG-LINT-004' : 'AXAG-LINT-005',
          ),
        );
      }

      // Check JSON validity for json-array attributes
      if (info.valueType === 'json-array' && value) {
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed)) {
            const pos = document.positionAt(offset);
            diagnostics.push(
              createDiagnostic(
                new vscode.Range(pos, pos.translate(0, name.length + value.length + 3)),
                `${name} must be a JSON array, got ${typeof parsed}`,
                vscode.DiagnosticSeverity.Error,
                'AXAG-LINT-009',
              ),
            );
          }
        } catch {
          const pos = document.positionAt(offset);
          diagnostics.push(
            createDiagnostic(
              new vscode.Range(pos, pos.translate(0, name.length + value.length + 3)),
              `Invalid JSON in ${name}: check brackets and quoting`,
              vscode.DiagnosticSeverity.Error,
              'AXAG-LINT-009',
            ),
          );
        }
      }
    }
  }

  diagnosticCollection.set(document.uri, diagnostics);
}

function createDiagnostic(
  range: vscode.Range,
  message: string,
  severity: vscode.DiagnosticSeverity,
  code: string,
): vscode.Diagnostic {
  const diag = new vscode.Diagnostic(range, message, severity);
  diag.code = code;
  diag.source = DIAGNOSTICS_SOURCE;
  return diag;
}
