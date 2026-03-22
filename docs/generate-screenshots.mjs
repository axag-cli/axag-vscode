/**
 * Generates VS Code-styled mockup screenshots for the AXAG extension marketplace listing.
 * Run: node docs/generate-screenshots.mjs
 */
import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'screenshots');
mkdirSync(outDir, { recursive: true });

const COLORS = {
  bg: '#1e1e1e',
  editorBg: '#1e1e1e',
  sidebar: '#252526',
  statusBar: '#007acc',
  lineNum: '#858585',
  text: '#d4d4d4',
  tag: '#569cd6',
  attr: '#9cdcfe',
  string: '#ce9178',
  comment: '#6a9955',
  keyword: '#c586c0',
  dropdownBg: '#252526',
  dropdownBorder: '#454545',
  dropdownHover: '#04395e',
  hoverBg: '#2d2d30',
  hoverBorder: '#454545',
  errorSquiggle: '#f44747',
  warningSquiggle: '#cca700',
  infoIcon: '#75beff',
  errorIcon: '#f44747',
  warningIcon: '#cca700',
};

function baseStyles() {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      line-height: 20px;
      background: ${COLORS.bg};
      color: ${COLORS.text};
      padding: 0;
    }
    .editor {
      background: ${COLORS.editorBg};
      padding: 8px 0;
      position: relative;
    }
    .line {
      display: flex;
      padding: 0 16px 0 0;
      white-space: pre;
    }
    .line-num {
      color: ${COLORS.lineNum};
      text-align: right;
      width: 44px;
      padding-right: 16px;
      flex-shrink: 0;
      user-select: none;
    }
    .line-content { flex: 1; }
    .tag { color: ${COLORS.tag}; }
    .attr { color: ${COLORS.attr}; }
    .str { color: ${COLORS.string}; }
    .cmt { color: ${COLORS.comment}; }
    .kw { color: ${COLORS.keyword}; }
    .punc { color: ${COLORS.text}; }
    .title-bar {
      background: #323233;
      padding: 6px 16px;
      font-size: 12px;
      color: #cccccc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      border-bottom: 1px solid #1e1e1e;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .title-bar .icon { color: #e37933; }
    .status-bar {
      background: ${COLORS.statusBar};
      padding: 3px 12px;
      font-size: 12px;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex;
      justify-content: space-between;
    }
    .status-item { display: flex; align-items: center; gap: 12px; }
  `;
}

// ── Screenshot 1: Autocomplete ──────────────────────────────
function autocompleteHTML() {
  return `<!DOCTYPE html><html><head><style>
    ${baseStyles()}
    .dropdown {
      position: absolute;
      left: 120px;
      top: 68px;
      background: ${COLORS.dropdownBg};
      border: 1px solid ${COLORS.dropdownBorder};
      border-radius: 4px;
      min-width: 420px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
      z-index: 10;
      font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
      font-size: 13px;
    }
    .dropdown-item {
      padding: 4px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: default;
    }
    .dropdown-item:first-child { border-radius: 4px 4px 0 0; }
    .dropdown-item:last-child { border-radius: 0 0 4px 4px; }
    .dropdown-item.selected { background: ${COLORS.dropdownHover}; }
    .dropdown-icon {
      background: #007acc;
      color: #fff;
      width: 18px; height: 18px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 3px;
      font-size: 11px;
      font-weight: bold;
      flex-shrink: 0;
    }
    .dropdown-label { color: ${COLORS.text}; flex:1; }
    .dropdown-detail { color: ${COLORS.lineNum}; font-size: 11px; }
    .cursor-blink {
      display: inline-block;
      width: 2px;
      height: 16px;
      background: #aeafad;
      vertical-align: text-bottom;
      animation: blink 1s step-end infinite;
    }
  </style></head><body>
    <div class="title-bar"><span class="icon">⬡</span> demo.html — AXAG Demo</div>
    <div class="editor">
      <div class="line"><span class="line-num">41</span><span class="line-content">  <span class="cmt">&lt;!-- Type axag- for autocomplete --&gt;</span></span></div>
      <div class="line"><span class="line-num">42</span><span class="line-content">  <span class="punc">&lt;</span><span class="tag">button</span></span></div>
      <div class="line"><span class="line-num">43</span><span class="line-content">    <span class="attr">axag-</span><span class="cursor-blink"></span></span></div>
      <div class="line"><span class="line-num">44</span><span class="line-content">  <span class="punc">&gt;</span></span></div>
      <div class="line"><span class="line-num">45</span><span class="line-content">    ✏️ Edit Profile</span></div>
      <div class="line"><span class="line-num">46</span><span class="line-content">  <span class="punc">&lt;/</span><span class="tag">button</span><span class="punc">&gt;</span></span></div>
      <div class="dropdown">
        <div class="dropdown-item selected"><span class="dropdown-icon">⚡</span><span class="dropdown-label">axag-intent</span><span class="dropdown-detail">Semantic intent (entity.action)</span></div>
        <div class="dropdown-item"><span class="dropdown-icon">⚡</span><span class="dropdown-label">axag-entity</span><span class="dropdown-detail">Target domain entity</span></div>
        <div class="dropdown-item"><span class="dropdown-icon">⚡</span><span class="dropdown-label">axag-action-type</span><span class="dropdown-detail">read | write | delete | navigate</span></div>
        <div class="dropdown-item"><span class="dropdown-icon">⚡</span><span class="dropdown-label">axag-description</span><span class="dropdown-detail">Human-readable description</span></div>
        <div class="dropdown-item"><span class="dropdown-icon">⚡</span><span class="dropdown-label">axag-risk-level</span><span class="dropdown-detail">none | low | medium | high | critical</span></div>
        <div class="dropdown-item"><span class="dropdown-icon">⚡</span><span class="dropdown-label">axag-scope</span><span class="dropdown-detail">user | tenant | global</span></div>
        <div class="dropdown-item"><span class="dropdown-icon">⚡</span><span class="dropdown-label">axag-idempotent</span><span class="dropdown-detail">Safe to retry (true | false)</span></div>
        <div class="dropdown-item"><span class="dropdown-icon">⚡</span><span class="dropdown-label">axag-confirmation-required</span><span class="dropdown-detail">Needs user confirmation</span></div>
        <div class="dropdown-item"><span class="dropdown-icon">⚡</span><span class="dropdown-label">axag-required-params</span><span class="dropdown-detail">JSON array of required params</span></div>
        <div class="dropdown-item"><span class="dropdown-icon">⚡</span><span class="dropdown-label">axag-optional-params</span><span class="dropdown-detail">JSON array of optional params</span></div>
      </div>
    </div>
    <div class="status-bar">
      <div class="status-item"><span>⚡ 3 AXAG</span></div>
      <div class="status-item"><span>HTML</span><span>UTF-8</span></div>
    </div>
  </body></html>`;
}

// ── Screenshot 2: Hover ──────────────────────────────
function hoverHTML() {
  return `<!DOCTYPE html><html><head><style>
    ${baseStyles()}
    .hover-popup {
      position: absolute;
      left: 80px;
      top: 42px;
      background: ${COLORS.hoverBg};
      border: 1px solid ${COLORS.hoverBorder};
      border-radius: 4px;
      padding: 10px 14px;
      max-width: 480px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
      z-index: 10;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 13px;
      line-height: 1.5;
    }
    .hover-popup code {
      font-family: 'Menlo', 'Monaco', monospace;
      background: #1e1e1e;
      padding: 1px 4px;
      border-radius: 3px;
      font-size: 12px;
    }
    .hover-title { font-weight: 600; color: #4ec9b0; margin-bottom: 6px; }
    .hover-sep { border-top: 1px solid ${COLORS.dropdownBorder}; margin: 8px 0; }
    .hover-label { color: ${COLORS.lineNum}; }
    .hover-values { color: #dcdcaa; }
    .hover-req { color: #f44747; font-weight: 600; }
    .underline-attr { text-decoration: underline; text-decoration-color: #007acc; text-underline-offset: 3px; }
  </style></head><body>
    <div class="title-bar"><span class="icon">⬡</span> demo.html — AXAG Demo</div>
    <div class="editor">
      <div class="line"><span class="line-num">10</span><span class="line-content">  <span class="punc">&lt;</span><span class="tag">button</span></span></div>
      <div class="line"><span class="line-num">11</span><span class="line-content">    <span class="attr">axag-intent</span><span class="punc">=</span><span class="str">"product.search"</span></span></div>
      <div class="line"><span class="line-num">12</span><span class="line-content">    <span class="attr">axag-entity</span><span class="punc">=</span><span class="str">"product"</span></span></div>
      <div class="line"><span class="line-num">13</span><span class="line-content">    <span class="attr underline-attr">axag-action-type</span><span class="punc">=</span><span class="str">"read"</span></span></div>
      <div class="line"><span class="line-num">14</span><span class="line-content">    <span class="attr">axag-description</span><span class="punc">=</span><span class="str">"Search products by keyword"</span></span></div>
      <div class="line"><span class="line-num">15</span><span class="line-content">    <span class="attr">axag-risk-level</span><span class="punc">=</span><span class="str">"none"</span></span></div>
      <div class="line"><span class="line-num">16</span><span class="line-content">  <span class="punc">&gt;</span></span></div>
      <div class="hover-popup">
        <div class="hover-title">axag-action-type</div>
        <div>The type of action this element performs on the target entity.</div>
        <div class="hover-sep"></div>
        <div><span class="hover-label">Type:</span> <code>enum</code></div>
        <div><span class="hover-label">Values:</span> <span class="hover-values"><code>read</code> <code>write</code> <code>delete</code> <code>navigate</code></span></div>
        <div><span class="hover-label">Required:</span> <span class="hover-req">Yes</span></div>
      </div>
    </div>
    <div class="status-bar">
      <div class="status-item"><span>⚡ 3 AXAG</span></div>
      <div class="status-item"><span>HTML</span><span>UTF-8</span></div>
    </div>
  </body></html>`;
}

// ── Screenshot 3: Diagnostics ──────────────────────────────
function diagnosticsHTML() {
  return `<!DOCTYPE html><html><head><style>
    ${baseStyles()}
    .squiggle-error {
      text-decoration: wavy underline ${COLORS.errorSquiggle};
      text-underline-offset: 3px;
    }
    .squiggle-warning {
      text-decoration: wavy underline ${COLORS.warningSquiggle};
      text-underline-offset: 3px;
    }
    .problems-panel {
      background: #1e1e1e;
      border-top: 1px solid ${COLORS.dropdownBorder};
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 12px;
    }
    .problems-header {
      background: ${COLORS.sidebar};
      padding: 4px 12px;
      color: ${COLORS.text};
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
      border-bottom: 1px solid ${COLORS.dropdownBorder};
    }
    .problems-header .badge {
      background: #f44747;
      color: #fff;
      border-radius: 10px;
      padding: 0 6px;
      font-size: 11px;
    }
    .problem-item {
      padding: 4px 12px 4px 28px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: ${COLORS.text};
    }
    .problem-item .err-icon { color: ${COLORS.errorIcon}; font-size: 14px; }
    .problem-item .warn-icon { color: ${COLORS.warningIcon}; font-size: 14px; }
    .problem-item .msg { flex: 1; }
    .problem-item .src { color: ${COLORS.lineNum}; font-size: 11px; }
    .problem-item .loc { color: ${COLORS.lineNum}; font-size: 11px; }
  </style></head><body>
    <div class="title-bar"><span class="icon">⬡</span> demo.html — AXAG Demo</div>
    <div class="editor">
      <div class="line"><span class="line-num">34</span><span class="line-content">  <span class="cmt">&lt;!-- ⚠️ Element with validation errors --&gt;</span></span></div>
      <div class="line"><span class="line-num">35</span><span class="line-content">  <span class="punc">&lt;</span><span class="tag">button</span></span></div>
      <div class="line"><span class="line-num">36</span><span class="line-content">    <span class="attr">axag-intent</span><span class="punc">=</span><span class="str">"account.delete"</span></span></div>
      <div class="line"><span class="line-num">37</span><span class="line-content">    <span class="attr">axag-action-type</span><span class="punc">=</span><span class="str squiggle-error">"destroy"</span></span></div>
      <div class="line"><span class="line-num">38</span><span class="line-content">    <span class="attr">axag-risk-level</span><span class="punc">=</span><span class="str squiggle-error">"extreme"</span></span></div>
      <div class="line"><span class="line-num">39</span><span class="line-content">  <span class="punc">&gt;</span></span></div>
      <div class="line"><span class="line-num">40</span><span class="line-content">    🗑️ Delete Account</span></div>
      <div class="line"><span class="line-num">41</span><span class="line-content">  <span class="punc">&lt;/</span><span class="tag">button</span><span class="punc">&gt;</span></span></div>
    </div>
    <div class="problems-panel">
      <div class="problems-header">⚠ PROBLEMS <span class="badge">4</span></div>
      <div class="problem-item"><span class="err-icon">⊘</span><span class="msg">Invalid axag-action-type: "destroy". Expected: read, write, delete, navigate</span><span class="src">axag</span><span class="loc">[37, 22]</span></div>
      <div class="problem-item"><span class="err-icon">⊘</span><span class="msg">Invalid axag-risk-level: "extreme". Expected: none, low, medium, high, critical</span><span class="src">axag</span><span class="loc">[38, 21]</span></div>
      <div class="problem-item"><span class="warn-icon">⚠</span><span class="msg">Missing required attribute: axag-entity (required when axag-intent is present)</span><span class="src">axag</span><span class="loc">[36, 5]</span></div>
      <div class="problem-item"><span class="warn-icon">⚠</span><span class="msg">Missing required attribute: axag-description (required when axag-intent is present)</span><span class="src">axag</span><span class="loc">[36, 5]</span></div>
    </div>
  </body></html>`;
}

// ── Screenshot 4: Snippets ──────────────────────────────
function snippetsHTML() {
  return `<!DOCTYPE html><html><head><style>
    ${baseStyles()}
    .snippet-dropdown {
      position: absolute;
      left: 80px;
      top: 48px;
      background: ${COLORS.dropdownBg};
      border: 1px solid ${COLORS.dropdownBorder};
      border-radius: 4px;
      min-width: 360px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
      z-index: 10;
      font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
      font-size: 13px;
    }
    .sn-item {
      padding: 4px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sn-item.selected { background: ${COLORS.dropdownHover}; }
    .sn-icon {
      background: #b180d7;
      color: #fff;
      width: 18px; height: 18px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 3px;
      font-size: 10px;
      font-weight: bold;
      flex-shrink: 0;
    }
    .sn-label { color: ${COLORS.text}; }
    .sn-detail { color: ${COLORS.lineNum}; font-size: 11px; margin-left: auto; }
    .snippet-preview {
      position: absolute;
      left: 450px;
      top: 48px;
      background: ${COLORS.hoverBg};
      border: 1px solid ${COLORS.hoverBorder};
      border-radius: 4px;
      padding: 10px 14px;
      width: 460px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4);
      z-index: 10;
      font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
      font-size: 12px;
      line-height: 18px;
      white-space: pre;
    }
    .snippet-preview .ph { color: #dcdcaa; background: #264f78; padding: 0 2px; border-radius: 2px; }
  </style></head><body>
    <div class="title-bar"><span class="icon">⬡</span> demo.html — AXAG Demo</div>
    <div class="editor">
      <div class="line"><span class="line-num">41</span><span class="line-content">  <span class="cmt">&lt;!-- Scaffold a complete annotated element --&gt;</span></span></div>
      <div class="line"><span class="line-num">42</span><span class="line-content"></span></div>
      <div class="line"><span class="line-num">43</span><span class="line-content">  axag-full</span></div>
      <div class="line"><span class="line-num">44</span><span class="line-content"></span></div>
      <div class="line"><span class="line-num">45</span><span class="line-content"></span></div>
      <div class="snippet-dropdown">
        <div class="sn-item selected"><span class="sn-icon">✂</span><span class="sn-label">axag-full</span><span class="sn-detail">Full AXAG annotation</span></div>
        <div class="sn-item"><span class="sn-icon">✂</span><span class="sn-label">axag-read</span><span class="sn-detail">Read operation</span></div>
        <div class="sn-item"><span class="sn-icon">✂</span><span class="sn-label">axag-write</span><span class="sn-detail">Write operation</span></div>
        <div class="sn-item"><span class="sn-icon">✂</span><span class="sn-label">axag-delete</span><span class="sn-detail">Delete operation</span></div>
        <div class="sn-item"><span class="sn-icon">✂</span><span class="sn-label">axag-nav</span><span class="sn-detail">Navigate operation</span></div>
      </div>
      <div class="snippet-preview"><span class="punc">&lt;</span><span class="tag">button</span>
  <span class="attr">axag-intent</span>=<span class="str">"<span class="ph">entity.action</span>"</span>
  <span class="attr">axag-entity</span>=<span class="str">"<span class="ph">entity</span>"</span>
  <span class="attr">axag-action-type</span>=<span class="str">"<span class="ph">write</span>"</span>
  <span class="attr">axag-description</span>=<span class="str">"<span class="ph">Describe the operation</span>"</span>
  <span class="attr">axag-risk-level</span>=<span class="str">"<span class="ph">high</span>"</span>
  <span class="attr">axag-idempotent</span>=<span class="str">"<span class="ph">false</span>"</span>
  <span class="attr">axag-confirmation-required</span>=<span class="str">"<span class="ph">true</span>"</span>
  <span class="attr">axag-scope</span>=<span class="str">"<span class="ph">user</span>"</span>
<span class="punc">&gt;</span>
  <span class="ph">Action</span>
<span class="punc">&lt;/</span><span class="tag">button</span><span class="punc">&gt;</span></div>
    </div>
    <div class="status-bar">
      <div class="status-item"><span>⚡ 3 AXAG</span></div>
      <div class="status-item"><span>HTML</span><span>UTF-8</span></div>
    </div>
  </body></html>`;
}

// ── Screenshot 5: Status Bar ──────────────────────────────
function statusbarHTML() {
  return `<!DOCTYPE html><html><head><style>
    ${baseStyles()}
    .status-bar {
      background: ${COLORS.statusBar};
      padding: 4px 16px;
      font-size: 13px;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .status-item { display: flex; align-items: center; gap: 16px; }
    .status-item span { display: flex; align-items: center; gap: 4px; }
    .axag-badge {
      background: rgba(255,255,255,0.15);
      padding: 1px 8px;
      border-radius: 3px;
      font-weight: 600;
    }
    .editor-compact { padding: 8px 0; }
    .highlight-line { background: rgba(255,255,255,0.04); }
  </style></head><body>
    <div class="title-bar"><span class="icon">⬡</span> demo.html — AXAG Demo</div>
    <div class="editor editor-compact">
      <div class="line"><span class="line-num">10</span><span class="line-content">  <span class="punc">&lt;</span><span class="tag">button</span></span></div>
      <div class="line"><span class="line-num">11</span><span class="line-content">    <span class="attr">axag-intent</span><span class="punc">=</span><span class="str">"product.search"</span></span></div>
      <div class="line"><span class="line-num">12</span><span class="line-content">    <span class="attr">axag-entity</span><span class="punc">=</span><span class="str">"product"</span></span></div>
      <div class="line"><span class="line-num">13</span><span class="line-content">    <span class="attr">axag-action-type</span><span class="punc">=</span><span class="str">"read"</span></span></div>
      <div class="line"><span class="line-num">14</span><span class="line-content">    <span class="attr">axag-description</span><span class="punc">=</span><span class="str">"Search products by keyword"</span></span></div>
      <div class="line highlight-line"><span class="line-num">15</span><span class="line-content">    <span class="attr">axag-risk-level</span><span class="punc">=</span><span class="str">"none"</span></span></div>
      <div class="line"><span class="line-num">16</span><span class="line-content">    <span class="attr">axag-idempotent</span><span class="punc">=</span><span class="str">"true"</span></span></div>
      <div class="line"><span class="line-num">17</span><span class="line-content">  <span class="punc">&gt;</span></span></div>
      <div class="line"><span class="line-num">18</span><span class="line-content">    🔍 Search Products</span></div>
      <div class="line"><span class="line-num">19</span><span class="line-content">  <span class="punc">&lt;/</span><span class="tag">button</span><span class="punc">&gt;</span></span></div>
    </div>
    <div class="status-bar">
      <div class="status-item">
        <span>main</span>
        <span>↻ 0 ↓ 0</span>
        <span>⊘ 0 ⚠ 0</span>
      </div>
      <div class="status-item">
        <span class="axag-badge">⚡ 3 AXAG annotations</span>
        <span>Ln 15, Col 24</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>HTML</span>
      </div>
    </div>
  </body></html>`;
}

// ── Generate all screenshots ──────────────────────────────
async function main() {
  const browser = await puppeteer.launch({ headless: true });

  const screenshots = [
    { name: 'autocomplete', html: autocompleteHTML(), width: 700, height: 260 },
    { name: 'hover',        html: hoverHTML(),        width: 700, height: 260 },
    { name: 'diagnostics',  html: diagnosticsHTML(),  width: 780, height: 320 },
    { name: 'snippets',     html: snippetsHTML(),     width: 920, height: 280 },
    { name: 'statusbar',    html: statusbarHTML(),    width: 780, height: 280 },
  ];

  for (const s of screenshots) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.width, height: s.height, deviceScaleFactor: 2 });
    await page.setContent(s.html, { waitUntil: 'networkidle0' });
    const outPath = join(outDir, `${s.name}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`✅ ${s.name}.png  (${s.width}×${s.height} @2x)`);
    await page.close();
  }

  await browser.close();
  console.log(`\nAll screenshots saved to ${outDir}/`);
}

main().catch(err => { console.error(err); process.exit(1); });
