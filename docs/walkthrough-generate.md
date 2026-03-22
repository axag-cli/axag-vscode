## Generate MCP Tools from Your Annotations

AXAG annotations → Semantic Manifest → MCP Tool Registry

### Install the CLI

```bash
npm install -g axag-cli
```

### Step 1: Scan & Generate Manifest

```bash
axag-cli scan ./src --manifest
```

This produces `axag-manifest.json` — a structured contract of every annotated operation.

### Step 2: Generate MCP Tools

```bash
axag-cli generate-tools
```

This produces `tool-registry.json` — ready-to-use MCP tool definitions that any AI agent can consume.

### Step 3: Lint Your Annotations

```bash
npx axag-lint ./src
```

Validates 26 rules: missing fields, invalid enums, safety contradictions, and more.

### The Pipeline

```
Your Code          →  Semantic Manifest  →  MCP Tools
(axag-* attrs)        (JSON contract)       (Agent-ready)

<button               {                     {
  axag-intent=           "intent":             "name":
  "product.search"       "product.search",     "product_search",
  ...                    "action_type": "read" "input_schema": {...}
>                      }                     }
```

📖 **Full docs:** [axag.org](https://axag.org)
