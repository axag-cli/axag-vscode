## Use Snippets to Go Fast

Instead of typing each attribute manually, use built-in snippets:

### Available Snippets

| Type `→` Tab | What you get |
|---|---|
| `axag-read` | A complete read operation (search, list, get) |
| `axag-write` | A write operation with risk level |
| `axag-delete` | A delete operation with confirmation required |
| `axag-full` | Full annotation with ALL safety attributes |
| `axag-nav` | A navigation operation |

### Example: Type `axag-full` + Tab

```html
<button
  axag-intent="entity.action"
  axag-entity="entity"
  axag-action-type="write"
  axag-description="Describe the operation"
  axag-risk-level="high"
  axag-idempotent="false"
  axag-confirmation-required="true"
  axag-scope="user"
  axag-side-effects='["effect_1"]'
  axag-preconditions='["condition_1"]'
>
  Action
</button>
```

Tab through the placeholders to fill in your values!
