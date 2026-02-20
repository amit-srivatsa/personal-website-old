/**
 * One-time script: adds all required properties to the Notion blog database.
 * Run once: node scripts/setup-notion.mjs
 */
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!process.env.NOTION_API_KEY || !DATABASE_ID) {
  console.error('❌  Missing NOTION_API_KEY or NOTION_DATABASE_ID in .env');
  process.exit(1);
}

console.log('🔧  Setting up Notion database schema...\n');

await notion.databases.update({
  database_id: DATABASE_ID,
  title: [{ type: 'text', text: { content: 'Claude Blogs (Website)' } }],
  properties: {
    // "Name" (title) already exists — leave it alone

    Slug: {
      rich_text: {},
    },

    Excerpt: {
      rich_text: {},
    },

    'Published Date': {
      date: {},
    },

    Category: {
      select: {
        options: [
          { name: 'AI',          color: 'blue'   },
          { name: 'Marketing',   color: 'green'  },
          { name: 'Career',      color: 'purple' },
          { name: 'Travel',      color: 'orange' },
          { name: 'Technology',  color: 'red'    },
          { name: 'Life',        color: 'yellow' },
        ],
      },
    },

    Tags: {
      multi_select: {
        options: [
          { name: 'AI',           color: 'blue'   },
          { name: 'Marketing',    color: 'green'  },
          { name: 'Career',       color: 'purple' },
          { name: 'Travel',       color: 'orange' },
          { name: 'Technology',   color: 'red'    },
          { name: 'Productivity', color: 'pink'   },
          { name: 'Strategy',     color: 'gray'   },
        ],
      },
    },

    Status: {
      select: {
        options: [
          { name: 'Draft',     color: 'gray'  },
          { name: 'Published', color: 'green' },
        ],
      },
    },

    'Cover Image': {
      url: {},
    },

    Featured: {
      checkbox: {},
    },
  },
});

console.log('✅  Database schema configured successfully!');
console.log('\nNext steps:');
console.log('  1. Open the database in Notion and add your blog posts');
console.log('  2. Set Status = "Published" for posts you want to appear on the site');
console.log('  3. Run: npm run notion:sync  (or just: npm run build)');
