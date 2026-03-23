# AGENTS.md — Project Rules for AI Agents

> **Self-update rule:** Any agent making structural, infrastructure, or pipeline changes to this project **MUST update this file** to reflect those changes. Keep it concise — this is a living SOP, not a changelog. If this file exceeds ~200 lines, ask the user before adding more.

---

## Git Configuration
To prevent Vercel Hobby deployment blocks (which occur when commits are made by unverified collaborators or bots), all commits must be authored by Amit Srivatsa.
- **Correct ID:** `Amit Srivatsa <amitsrivatsa@outlook.com>`
- **Workflow:** Always ensure `git config user.email` is `amitsrivatsa@outlook.com` before pushing.

---

## Stack

| Layer      | Tech                                              |
|------------|----------------------------------------------------|
| Framework  | Astro 5 (static output)                           |
| Styling    | Tailwind CSS 3                                     |
| Hosting    | Firebase Hosting                                   |
| CMS        | Notion → `scripts/sync-notion.mjs` → Astro content collections |
| Images     | ImageKit (`ik.imagekit.io/mws`)                    |
| Analytics  | Google Analytics 4 (`PUBLIC_GA_MEASUREMENT_ID`)    |
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
- ✅ **DO** add cover images and inline images freely in Notion — both are auto-uploaded to ImageKit
- ❌ **DON'T** hardcode image URLs from Notion (`prod-files-secure.s3...`) — they expire in 1 hour
- ❌ **DON'T** prefix slugs with dates — URL structure is `/blog/{category}/{slug}/`

### CI/CD
- ✅ **DO** pass env vars via GitHub Actions secrets (not `.env` files in CI)
- ✅ **DO** add new secrets to both `.env.example` and `deploy.yml`
- ❌ **DON'T** use `--env-file=.env` in the `build` script (breaks CI)

### Env Vars
- ✅ **DO** prefix client-side env vars with `PUBLIC_` — Astro only exposes `PUBLIC_*` vars to the browser; unprefixed vars are server/build-time only
- ✅ **DO** note that `PUBLIC_GA_MEASUREMENT_ID` is optional — analytics load conditionally, so missing it never breaks the build or site

---

## Blog Pipeline

```
Notion DB → notion-sync.yml (hourly CI) → sync-notion.mjs → .md files committed to main
                                                ↓
                                     Cover + inline images uploaded to ImageKit
                                     (all cover images, not just Notion S3 URLs)

main branch → deploy.yml (on push) → astro build → Firebase deploy
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
| Cover Image     | URL          | —        | OG image and hero (auto-uploaded to ImageKit) |
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
| `NOTION_API_KEY`            | `.env` + GitHub | Notion API integration token     |
| `NOTION_DATABASE_ID`        | `.env` + GitHub | Notion blog database ID          |
| `IMAGEKIT_PRIVATE_KEY`      | `.env` + GitHub | Upload inline images to ImageKit |
| `PUBLIC_GA_MEASUREMENT_ID`  | `.env` + GitHub | Google Analytics 4 Measurement ID (baked in at build time) |
| `FIREBASE_SERVICE_ACCOUNT`  | GitHub only     | Firebase Hosting deploy creds    |

---

## Local Commands

```bash
npm run dev              # Dev server
npm run notion:sync      # Sync from Notion (uses .env)
npm run build            # Astro build only (no Notion sync — CI uses committed .md files)
npx firebase deploy --only hosting  # Deploy locally
```

---

## Code Conventions

- **Components**: React in `src/components/`, Astro islands in `src/components/islands/`
- **Layouts**: `BaseLayout.astro` for all pages
- **Styling**: Tailwind utility classes; globals in `src/styles/global.css`
- **Content**: Blog `.md` files in `src/content/blog/` (auto-generated, don't edit manually)

---

## Legal / Compliance

- **Cookie consent** is stored in `localStorage` key `cookieConsent` (`'granted'` | `'denied'`)
- **GA4 uses Consent Mode v2** — defaults to `analytics_storage: 'denied'` on every page load; only upgrades to `'granted'` when the user has accepted. **Never remove this default.**
- `CookieConsentIsland` is mounted in `BaseLayout.astro` and must stay there — removing it breaks GDPR compliance
- Privacy policy lives at `/privacy` (`src/pages/privacy.astro`) — update it if new data collection is added

---

## Site Structure & Navigation Maintenance

### ⚠️ Rule: When adding or removing pages, you MUST:

1. **Update `src/components/Footer.astro`** — add/remove the page from the relevant footer column:
   - **Work** column: services, portfolio, resources
   - **About** column: home, cv, writing/blog, newsletter, contact
   - **Legal bar** (bottom row): privacy policy, sitemap link
   - **Connect** column: social links, book consultation, rss

2. **Update the header nav** if the page is a primary nav item — see `src/components/Header.tsx`

3. **Sitemap** — the sitemap (`/sitemap-index.xml`) is auto-generated by `@astrojs/sitemap` at build time. **No manual updates needed.** Just ensure `site` is set in `astro.config.mjs`. Verify the new page appears at `https://amitsrivatsa.com/sitemap-index.xml` after deploy.

### Current page inventory

| Route | File | Footer section |
|---|---|---|
| `/` | `src/pages/index.astro` | About → Home |
| `/services` | `src/pages/services.astro` | Work → Services |
| `/portfolio` | `src/pages/portfolio.astro` | Work → Portfolio |
| `/resources` | `src/pages/resources.astro` | Work → Resources |
| `/cv` | `src/pages/cv.astro` | About → CV |
| `/blog` | `src/pages/blog/` | About → Writing |
| `/contact` | `src/pages/contact.astro` | About → Contact, Connect |
| `/book` | `src/pages/book.astro` | Connect → Book a consultation |
| `/privacy` | `src/pages/privacy.astro` | Legal bar |
| `/sitemap-index.xml` | auto (astrojs/sitemap) | Legal bar |
| `/rss.xml` | `src/pages/rss.xml.ts` | Connect → RSS Feed |
