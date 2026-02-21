# Agent Instructions — amitsrivatsa.com

These instructions apply to all AI agents (Gemini, Claude, Cursor, Copilot, etc.)
working on this codebase. Read this file before making any changes.

---

## Project Overview

| Item             | Details                                           |
|------------------|---------------------------------------------------|
| **Framework**    | Astro 5 (static output)                           |
| **Styling**      | Tailwind CSS 3                                    |
| **Hosting**      | Firebase Hosting                                  |
| **CMS**          | Notion → `scripts/sync-notion.mjs` → Astro content collections |
| **CI/CD**        | GitHub Actions → `.github/workflows/deploy.yml`   |
| **Domain**       | https://amitsrivatsa.com                          |

---

## Blog: Notion → Website Pipeline

### How it works
1. Author writes in the **Notion database** ("Claude Blogs (Website)")
2. Locally run `npm run notion:sync` (or `npm run build` which runs sync first)
3. `sync-notion.mjs` fetches Published posts → writes `.md` files to `src/content/blog/`
4. Astro builds static HTML from those `.md` files
5. Push to `main` → GitHub Actions builds + deploys to Firebase

### Blog URL structure
```
/blog/{category}/{slug}/
```
- **category** = lowercased, hyphenated category from Notion (e.g., `career`, `ai`, `technology`)
- **slug** = the `Slug` field from the Notion database (e.g., `real-difference-fast-learners`)

Route file: `src/pages/blog/[category]/[slug].astro`

### Notion database fields
| Field           | Type          | Required | Notes                              |
|-----------------|---------------|----------|------------------------------------|
| Name            | Title         | ✅       | Blog post title                    |
| Slug            | Rich text     | ✅       | URL-safe slug (no date prefix)     |
| Published Date  | Date          | ✅       | Publication date                   |
| Status          | Select        | ✅       | "Draft" or "Published"             |
| Category        | Select        | ✅       | Used in URL path                   |
| Excerpt         | Rich text     | —        | Meta description / preview text    |
| Cover Image     | URL           | —        | OG image and hero image            |
| Tags            | Multi-select  | —        | For keywords meta tag              |
| Featured        | Checkbox      | —        | Highlight in featured sections     |

---

## SEO Requirements (MANDATORY for every page)

**Every page must include proper SEO metadata.** This is non-negotiable.

### Required meta tags (handled by BaseLayout.astro)
- `<title>` — descriptive, unique per page
- `<meta name="description">` — compelling summary, 150-160 chars
- `<link rel="canonical">` — auto-generated from URL
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:type`, `og:image`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

### Blog post SEO rules
When creating or modifying a blog post page:

1. **Title** → `"{Post Title} - Amit Srivatsa"`
2. **Description** → Use the post's `excerpt`. If no excerpt, use the first 155 characters of the body.
3. **OG Image** → Use the post's `Cover Image`. If none, omit (do NOT use a placeholder).
4. **OG Type** → `"article"`
5. **Keywords** → Combine `category` + `tags` + `"Amit Srivatsa"`
6. **JSON-LD** → Include `BlogPosting` structured data with:
   - `headline`, `datePublished`, `author`, `image`, `description`
   - `articleSection` (= category), `keywords` (= tags), `url` (= canonical)

### Default fallbacks (when context is insufficient)
- **Title**: `"{Page Name} - Amit Srivatsa"`
- **Description**: `"Amit Srivatsa — AI & marketing consultant helping B2B teams build clarity, better decisions, and scalable systems."`
- **OG Type**: `"website"`
- **Keywords**: `"AI consultant, marketing strategy, B2B marketing, Amit Srivatsa"`

---

## Build & Deploy

```bash
# Local development
npm run dev

# Sync from Notion + build
npm run build

# Sync only (no build)
npm run notion:sync

# Deploy to Firebase (local)
npx firebase deploy --only hosting
```

### CI/CD notes
- `sync-notion.mjs` gracefully skips if Notion env vars are missing (CI uses committed .md files)
- GitHub Actions only needs `FIREBASE_SERVICE_ACCOUNT` secret
- Pushing to `main` auto-deploys via GitHub Actions

---

## Code Conventions

- **Astro 5 API**: Use `render(post)` from `astro:content`, NOT `post.render()`
- **Post ID**: In Astro 5, `post.id` includes `.md` extension; strip it with `.replace(/\.md$/, '')`
- **Components**: React components in `src/components/`, Astro islands in `src/components/islands/`
- **Layouts**: Use `BaseLayout.astro` for all pages (handles SEO, header, footer)
- **Styling**: Tailwind utility classes; global styles in `src/styles/global.css`
