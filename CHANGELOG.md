# Changelog

All notable changes to the AXAG VS Code Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-21

### Added

- **Attribute autocomplete** — intelligent suggestions for all 15 `axag-*` attributes when typing inside HTML, JSX, and TSX elements
- **Enum value completion** — contextual value suggestions for `axag-action-type`, `axag-risk-level`, `axag-scope`, and boolean attributes
- **Hover documentation** — inline docs with description, type, allowed values, and required status for every AXAG attribute
- **Inline diagnostics** — real-time validation for missing required attributes, invalid enum values, and malformed JSON arrays
- **Snippets** — 5 scaffolding snippets (`axag-read`, `axag-write`, `axag-delete`, `axag-full`, `axag-nav`)
- Support for HTML, JSX (JavaScript React), and TSX (TypeScript React) languages
