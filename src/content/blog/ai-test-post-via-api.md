---
title: "AI Test Post via API"
date: 2026-02-20
category: "AI"
excerpt: "This is a test post created via the Notion API to verify the integration."
featured: true
tags: ["AI", "Technology"]
---


> 🧪 **Test post notice:** This article was auto-populated from the page metadata and is meant to validate your website publishing pipeline.


### Summary


This post demonstrates a minimal end-to-end workflow: metadata is captured in the database (title, slug, excerpt, tags, category, publish time, featured flag), and the page body can be generated automatically to match it.


### Key metadata (from this page)

- **Title:** AI Test Post via API
- **Slug:** `ai-test-post-via-api`
- **Category:** AI
- **Tags:** AI, Technology
- **Status:** Published
- **Featured:** Yes
- **Published:** 2026-02-20T15:00:00.000+01:00
- **Excerpt:** This is a test post created via the Notion API to verify the integration.

### Article


Why this exists


If you are building a Claude → Notion → Website workflow, the fastest way to find issues is to push a small, well-labeled post through the full chain. This entry is that “known-good” reference.


What should happen downstream

1. Your site should read the **Name** as the page title.
2. It should use **Slug** for the URL path.
3. It should use **Excerpt** as the meta description and for previews.
4. It should treat **Category** and **Tags** as taxonomy.
5. It should respect **Published Date**, and hide or show based on **Status**.
6. If **Featured** is enabled, it should surface the post in featured sections.

Quick verification checklist

- [ ] Page renders at `/ai-test-post-via-api`
- [ ] Excerpt shows correctly in list views and SEO metadata
- [ ] Category and tags are visible and link to filtered collections
- [ ] Published date is formatted correctly for Europe/Amsterdam
- [ ] Featured placement works

### Notes

- **Cover Image** is currently blank. Add a URL here when you are ready to test image rendering.
- Replace this body with your real content generator output once the pipeline is validated.
