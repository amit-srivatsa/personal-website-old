---
name: write_notion_blog
description: Standard operating procedure and markdown template for writing blog posts in Notion
---

# 📝 Notion Blog Post Template

## Required Fields

**Name:**         Your Article Title Here
                  → This becomes the `<title>` tag and the H1 on the page.
                  → Keep it under 60 chars for best SEO display.

**Slug:**         your-article-title-here
                  → Lowercase, hyphenated, no dates, no special characters.
                  → This becomes the URL: `/blog/{category}/{slug}/`

**Category:**     Career | AI | Technology | Marketing | Strategy
                  → Pick exactly one. This appears in the URL path.

**Published Date:** 2026-02-21
                  → The date shown on the article and used in structured data.

**Status:**       Draft → Published
                  → Only "Published" posts are synced to the website.

---

## Recommended Fields

**Cover Image:**  (Just add a cover image natively in Notion!)
                  → **Auto-uploaded to ImageKit** during sync.
                  → Used as the OG image (shows in social sharing previews).
                  → Used as the hero image on the blog post page.

**Excerpt:**      A compelling 1–2 sentence summary (150–160 chars).
                  → Used as the meta description for Google search results.

**Tags:**         Productivity, Strategy, Leadership
                  → Multi-select keywords. SEO booster.

**Featured:**     ☐ (checkbox)
                  → Surfaces the post in featured website sections.

---

## Body Content

Just write freely in the Notion page body!

- Add inline images natively — they are **auto-uploaded to ImageKit** during sync.
- Use headings (H2, H3) to structure your article
- Everything converts to markdown automatically

---

## Handled automatically (Zero work required)

- `<title>`           → "{Name} - Amit Srivatsa"
- `<meta description>` → Excerpt
- Open Graph tags    → title, description, URL, image, type=article
- Twitter Card tags  → same as OG
- JSON-LD            → BlogPosting structured data
- Canonical URL      → `/blog/{category}/{slug}/`
- Image Hosting      → Replaced with permanent ImageKit URLs
