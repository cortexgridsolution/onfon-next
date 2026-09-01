# Onfon Next Local Image Assets

This bundle preserves the exact filenames currently referenced by the Onfon Next source.

## Exact placement

Copy the entire `client/public/manus-storage/` folder from this bundle into the root of your local project, replacing or merging with:

```text
<your-project-root>/client/public/manus-storage/
```

The final local tree must be:

```text
client/public/manus-storage/onfon-next-auth-signal_b86be646.png
client/public/manus-storage/onfon-next-catalog-visual_f8d9ad39.png
client/public/manus-storage/onfon-next-hero-dashboard-red-black_940a8691.png
client/public/manus-storage/onfon-next-mark-red-black_b74af078.png
```

Do not rename these files. The source references them with these exact public URLs:

| Asset | Exact source URL | Used for |
|---|---|---|
| `onfon-next-auth-signal_b86be646.png` | `/manus-storage/onfon-next-auth-signal_b86be646.png` | Auth split-stage visual |
| `onfon-next-catalog-visual_f8d9ad39.png` | `/manus-storage/onfon-next-catalog-visual_f8d9ad39.png` | Catalogue/product visual |
| `onfon-next-hero-dashboard-red-black_940a8691.png` | `/manus-storage/onfon-next-hero-dashboard-red-black_940a8691.png` | Landing hero dashboard |
| `onfon-next-mark-red-black_b74af078.png` | `/manus-storage/onfon-next-mark-red-black_b74af078.png` | Header mark and favicon |

After copying, restart the local dev server. Because `client/public` is served at the site root, `/manus-storage/...` resolves directly to `client/public/manus-storage/...`.
