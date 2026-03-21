/**
 * Fetches all Published posts from Notion and writes them as markdown files
 * into src/content/blog/. Runs automatically before `astro build`.
 *
 * Run manually: node scripts/sync-notion.mjs
 */
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs/promises';
import path from 'path';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
const OUTPUT_DIR = path.resolve('./src/content/blog');

// Regex to match Notion's temporary S3 signed image URLs
const NOTION_S3_RE = /https:\/\/prod-files-secure\.s3\.us-west-2\.amazonaws\.com\/[^\s)]+/g;

if (!process.env.NOTION_API_KEY || !DATABASE_ID) {
  console.log('ℹ️  NOTION_API_KEY or NOTION_DATABASE_ID not set — skipping sync (using committed .md files)');
  process.exit(0);
}

/**
 * Upload an image from a URL to ImageKit and return the permanent URL.
 * Falls back to the original URL if upload fails or key is missing.
 */
async function uploadToImageKit(imageUrl, slug, index) {
  if (!IMAGEKIT_PRIVATE_KEY) return imageUrl;

  try {
    // Download the image from Notion's S3
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`Download failed: ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const base64 = buffer.toString('base64');

    // Determine file extension from content-type
    const contentType = res.headers.get('content-type') || 'image/png';
    const ext = contentType.split('/')[1]?.replace('jpeg', 'jpg') || 'png';
    const fileName = index === 'cover' ? `cover.${ext}` : `image-${index + 1}.${ext}`;

    // Upload to ImageKit via their Upload API
    const authHeader = 'Basic ' + Buffer.from(IMAGEKIT_PRIVATE_KEY + ':').toString('base64');

    const form = new FormData();
    form.append('file', base64);
    form.append('fileName', fileName);
    form.append('folder', `/blog/${slug}/`);
    form.append('useUniqueFileName', 'false');

    const uploadRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
      method: 'POST',
      headers: { Authorization: authHeader },
      body: form,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`ImageKit upload failed (${uploadRes.status}): ${errText}`);
    }

    const data = await uploadRes.json();
    console.log(`      📸  Uploaded ${fileName} → ${data.url}`);
    return data.url;
  } catch (err) {
    console.warn(`      ⚠️  Image upload failed (keeping original URL): ${err.message}`);
    return imageUrl;
  }
}

/**
 * Replace all Notion S3 signed URLs in a markdown string with permanent ImageKit URLs.
 */
async function replaceNotionImages(markdown, slug) {
  const matches = [...markdown.matchAll(NOTION_S3_RE)];
  if (matches.length === 0) return markdown;

  if (!IMAGEKIT_PRIVATE_KEY) {
    console.warn(`      ⚠️  Found ${matches.length} Notion image(s) but IMAGEKIT_PRIVATE_KEY not set — URLs will expire!`);
    return markdown;
  }

  console.log(`      🖼️  Found ${matches.length} inline image(s) to upload...`);
  let result = markdown;

  for (let i = 0; i < matches.length; i++) {
    const originalUrl = matches[i][0];
    const permanentUrl = await uploadToImageKit(originalUrl, slug, i);
    result = result.replace(originalUrl, permanentUrl);
  }

  return result;
}

console.log('📥  Syncing posts from Notion...\n');

// 1. Clear all existing markdown files (full sync)
const existing = await fs.readdir(OUTPUT_DIR);
await Promise.all(
  existing
    .filter(f => f.endsWith('.md'))
    .map(f => fs.unlink(path.join(OUTPUT_DIR, f)))
);

// 2. Query published posts
const response = await notion.databases.query({
  database_id: DATABASE_ID,
  filter: {
    property: 'Status',
    select: { equals: 'Published' },
  },
  sorts: [{ property: 'Published Date', direction: 'descending' }],
});
const results = response.results;

if (results.length === 0) {
  console.log('ℹ️   No published posts found in Notion. Blog will be empty.');
  process.exit(0);
}

// 3. Convert each page to a markdown file
let synced = 0;

for (const page of results) {
  const props = page.properties;

  // Title
  const titleProp = props['Name'] ?? props['Title'];
  const title = titleProp?.title?.[0]?.plain_text ?? 'Untitled';

  // Slug — required, skip if missing
  const slug = props['Slug']?.rich_text?.[0]?.plain_text ?? '';
  if (!slug) {
    console.warn(`  ⚠️  Skipping "${title}" — Slug is empty`);
    continue;
  }

  const excerpt = props['Excerpt']?.rich_text?.[0]?.plain_text ?? '';
  const dateStr = props['Published Date']?.date?.start ?? new Date().toISOString().split('T')[0];
  const category = props['Category']?.select?.name ?? 'Uncategorized';
  let image = props['Cover Image']?.url ?? '';
  const featured = props['Featured']?.checkbox ?? false;
  const tags = (props['Tags']?.multi_select ?? []).map(t => t.name);

  // Always download and re-upload cover image to ImageKit for permanent hosting
  if (image) {
    console.log(`      🖼️  Uploading cover image to ImageKit...`);
    image = await uploadToImageKit(image, slug, 'cover');
  }

  // Fetch body as markdown
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  let body = n2m.toMarkdownString(mdBlocks).parent ?? '';

  // Upload inline Notion images to ImageKit (replace expiring S3 URLs)
  body = await replaceNotionImages(body, slug);

  // Build frontmatter
  const lines = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: ${dateStr}`,
    `category: "${category}"`,
  ];
  if (excerpt) lines.push(`excerpt: "${excerpt.replace(/"/g, '\\"')}"`);
  if (image) lines.push(`image: "${image}"`);
  if (featured) lines.push(`featured: true`);
  if (tags.length) lines.push(`tags: [${tags.map(t => `"${t}"`).join(', ')}]`);
  lines.push('---');

  const content = `${lines.join('\n')}\n\n${body}`;
  const filename = `${slug}.md`;

  await fs.writeFile(path.join(OUTPUT_DIR, filename), content, 'utf-8');
  console.log(`  ✓  ${filename}`);
  synced++;
}

console.log(`\n✅  Synced ${synced} post(s) from Notion → src/content/blog/`);
