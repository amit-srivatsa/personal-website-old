# AGENTS.md — Project Rules for AI Agents

> **Self-update rule:** Any agent making structural, infrastructure, or pipeline changes to this project **MUST update this file** to reflect those changes. Keep it concise — this is a living SOP, not a changelog. If this file exceeds ~200 lines, ask the user before adding more.

---

## Stack

| Layer      | Tech                                              |
|------------|----------------------------------------------------|
| Framework  | Astro 5 (static output)                           |
| Styling    | Tailwind CSS 3                                     |
| Hosting    | Firebase Hosting                                   |
| CMS        | Notion → `scripts/sync-notion.mjs` → Astro content collections |
| Images     | ImageKit (`ik.imagekit.io/mws`)                    |
| CI/CD      | GitHub Actions → `.github/workflows/deploy.yml`   |
| Domain     | https://amitsrivatsa.com                           |

---

## Do's and Don'ts

### General
- ✅ **DO** use `BaseLayout.astro` for all pages (handles SEO, header, footer)
- ✅ **DO** use `render(post)` from `astro:content` (Astro 5 API)
- ✅ **DO** strip `.md` from `post.id` — Astro 5 includes the extension
- ❌ **DON'T** use `post.render()` — deprecated in Astro 5
- ❌ **DON'T** commit secrets or API keys — use `.env` locally, GitHub secrets in CI

### Blog Posts
- ✅ **DO** set all required Notion fields: Name, Slug, Published Date, Status, Category
- ✅ **DO** include SEO metadata on every blog page (title, description, OG tags, JSON-LD)
- ✅ **DO** use inline images freely in Notion — they're auto-uploaded to ImageKit during sync
- ❌ **DON'T** hardcode image URLs from Notion (`prod-files-secure.s3...`) — they expire in 1 hour
- ❌ **DON'T** prefix slugs with dates — URL structure is `/blog/{category}/{slug}/`

### CI/CD
- ✅ **DO** pass env vars via GitHub Actions secrets (not `.env` files in CI)
- ✅ **DO** add new secrets to both `.env.example` and `deploy.yml`
- ❌ **DON'T** use `--env-file=.env` in the `build` script (breaks CI)

---

## Blog Pipeline

```
Notion DB → sync-notion.mjs → .md files → Astro build → Firebase deploy
                  ↓
         Inline images downloaded
         and uploaded to ImageKit
```

### URL structure
```
/blog/{category}/{slug}/
```
- **category** = lowercased, hyphenated (e.g., `career`, `ai`)
- **slug** = `Slug` field from Notion (e.g., `real-difference-fast-learners`)
- Route file: `src/pages/blog/[category]/[slug].astro`

### Notion database fields
| Field           | Type         | Required | Notes                           |
|-----------------|--------------|----------|---------------------------------|
| Name            | Title        | ✅       | Blog post title                 |
| Slug            | Rich text    | ✅       | URL-safe, no date prefix        |
| Published Date  | Date         | ✅       | Publication date                |
| Status          | Select       | ✅       | "Draft" or "Published"          |
| Category        | Select       | ✅       | Used in URL path                |
| Excerpt         | Rich text    | —        | Meta description / preview text |
| Cover Image     | URL          | —        | OG image and hero               |
| Tags            | Multi-select | —        | For keywords meta tag           |
| Featured        | Checkbox     | —        | Highlight in featured sections  |

---

## SEO Rules (Mandatory)

Every page **must** have:
- `<title>` — `"{Page/Post Title} - Amit Srivatsa"`
- `<meta name="description">` — excerpt or first 155 chars of body
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:type`, `og:image`)
- Twitter Card tags

Blog posts additionally need:
- `og:type` = `"article"`
- JSON-LD `BlogPosting` structured data
- Keywords = category + tags + "Amit Srivatsa"

Default fallback description:
> "Amit Srivatsa — AI & marketing consultant helping B2B teams build clarity, better decisions, and scalable systems."

---

## Secrets

| Secret                     | Where          | Purpose                          |
|----------------------------|----------------|----------------------------------|
| `NOTION_API_KEY`           | `.env` + GitHub | Notion API integration token     |
| `NOTION_DATABASE_ID`       | `.env` + GitHub | Notion blog database ID          |
| `IMAGEKIT_PRIVATE_KEY`     | `.env` + GitHub | Upload inline images to ImageKit |
| `FIREBASE_SERVICE_ACCOUNT` | GitHub only     | Firebase Hosting deploy creds    |

---

## Local Commands

```bash
npm run dev              # Dev server
npm run notion:sync      # Sync from Notion (uses .env)
npm run build            # Sync + Astro build (CI-compatible, no .env needed)
npx firebase deploy --only hosting  # Deploy locally
```

---

## Code Conventions

- **Components**: React in `src/components/`, Astro islands in `src/components/islands/`
- **Layouts**: `BaseLayout.astro` for all pages
- **Styling**: Tailwind utility classes; globals in `src/styles/global.css`
- **Content**: Blog `.md` files in `src/content/blog/` (auto-generated, don't edit manually)
