## Annotate Your First Element

Add `axag-*` attributes to any HTML element to declare its agent-visible semantics:

```html
<button
  axag-intent="product.search"
  axag-entity="product"
  axag-action-type="read"
  axag-description="Search for products by keyword"
  axag-risk-level="none"
  axag-idempotent="true"
>
  Search Products
</button>
```

### What each attribute means:

| Attribute | Purpose |
|-----------|---------|
| `axag-intent` | **What** this element does (entity.verb format) |
| `axag-entity` | **Which** domain object it operates on |
| `axag-action-type` | **How** it affects data (read/write/delete/navigate) |
| `axag-description` | **Why** — human-readable explanation |
| `axag-risk-level` | **Safety** — how dangerous is this action? |

💡 **Tip:** Type `axag-` inside any element and autocomplete will suggest all available attributes!
