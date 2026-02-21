import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_API_KEY });
console.log('databases:', Object.keys(notion.databases));
console.log('dataSources:', Object.keys(notion.dataSources));
