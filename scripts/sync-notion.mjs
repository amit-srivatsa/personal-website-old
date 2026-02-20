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
const OUTPUT_DIR = path.resolve('./src/content/blog');

if (!process.env.NOTION_API_KEY || !DATABASE_ID) {
  console.error('❌  Missing NOTION_API_KEY or NOTION_DATABASE_ID in .env');
  process.exit(1);
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
const { results } = await notion.databases.query({
  database_id: DATABASE_ID,
  filter: {
    property: 'Status',
    select: { equals: 'Published' },
  },
  sorts: [{ property: 'Published Date', direction: 'descending' }],
});

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

  const excerpt  = props['Excerpt']?.rich_text?.[0]?.plain_text ?? '';
  const dateStr  = props['Published Date']?.date?.start ?? new Date().toISOString().split('T')[0];
  const category = props['Category']?.select?.name ?? 'Uncategorized';
  const image    = props['Cover Image']?.url ?? '';
  const featured = props['Featured']?.checkbox ?? false;
  const tags     = (props['Tags']?.multi_select ?? []).map(t => t.name);

  // Fetch body as markdown
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const body = n2m.toMarkdownString(mdBlocks).parent ?? '';

  // Build frontmatter
  const lines = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: ${dateStr}`,
    `category: "${category}"`,
  ];
  if (excerpt) lines.push(`excerpt: "${excerpt.replace(/"/g, '\\"')}"`);
  if (image)   lines.push(`image: "${image}"`);
  if (featured) lines.push(`featured: true`);
  if (tags.length) lines.push(`tags: [${tags.map(t => `"${t}"`).join(', ')}]`);
  lines.push('---');

  const content = `${lines.join('\n')}\n\n${body}`;
  const filename = `${dateStr}-${slug}.md`;

  await fs.writeFile(path.join(OUTPUT_DIR, filename), content, 'utf-8');
  console.log(`  ✓  ${filename}`);
  synced++;
}

console.log(`\n✅  Synced ${synced} post(s) from Notion → src/content/blog/`);
