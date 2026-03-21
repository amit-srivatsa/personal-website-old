/**
 * GA4 Traffic Analysis Script
 * Usage: node --env-file=.env scripts/analyze-traffic.mjs
 *
 * Required env vars:
 *   GA_PROPERTY_ID               — GA4 property ID (e.g. 525475528)
 *   GOOGLE_APPLICATION_CREDENTIALS — path to service account JSON
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const propertyId = process.env.GA_PROPERTY_ID;
if (!propertyId) {
  console.error('Missing GA_PROPERTY_ID env var');
  process.exit(1);
}

// Resolve credentials path relative to project root
const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (credPath) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = resolve(process.cwd(), credPath);
}

const client = new BetaAnalyticsDataClient();

function fmt(n) {
  return Number(n).toLocaleString();
}

function bar(value, max, width = 30) {
  const filled = Math.round((value / max) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

async function runReport(title, request) {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    ...request,
  });
  return { title, response };
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║          amitsrivatsa.com — Traffic Analysis             ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  const dateRanges = [{ startDate: '30daysAgo', endDate: 'today' }];

  // ── 1. Overview ────────────────────────────────────────────────────────────
  const [overview] = await Promise.all([
    runReport('Overview', {
      dateRanges,
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'newUsers' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
      ],
    }),
  ]);

  const o = overview.response.rows?.[0]?.metricValues ?? [];
  const sessions = parseInt(o[0]?.value ?? 0);
  const users = parseInt(o[1]?.value ?? 0);
  const newUsers = parseInt(o[2]?.value ?? 0);
  const pageViews = parseInt(o[3]?.value ?? 0);
  const bounceRate = parseFloat(o[4]?.value ?? 0) * 100;
  const avgDuration = parseFloat(o[5]?.value ?? 0);
  const mins = Math.floor(avgDuration / 60);
  const secs = Math.round(avgDuration % 60);

  console.log('── Last 30 Days Overview ──────────────────────────────────');
  console.log(`  Sessions          : ${fmt(sessions)}`);
  console.log(`  Total Users       : ${fmt(users)}`);
  console.log(`  New Users         : ${fmt(newUsers)} (${users > 0 ? ((newUsers / users) * 100).toFixed(1) : 0}%)`);
  console.log(`  Page Views        : ${fmt(pageViews)}`);
  console.log(`  Bounce Rate       : ${bounceRate.toFixed(1)}%`);
  console.log(`  Avg Session Time  : ${mins}m ${secs}s`);

  // ── 2. Top Pages ───────────────────────────────────────────────────────────
  const [topPages] = await Promise.all([
    runReport('Top Pages', {
      dateRanges,
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 10,
    }),
  ]);

  console.log('\n── Top 10 Pages ───────────────────────────────────────────');
  const pageRows = topPages.response.rows ?? [];
  const maxPageViews = parseInt(pageRows[0]?.metricValues[0]?.value ?? 1);
  pageRows.forEach((row, i) => {
    const path = row.dimensionValues[0].value.slice(0, 40).padEnd(40);
    const views = parseInt(row.metricValues[0].value);
    const u = parseInt(row.metricValues[1].value);
    console.log(`  ${String(i + 1).padStart(2)}. ${path} ${fmt(views).padStart(6)} views  ${fmt(u).padStart(5)} users`);
    console.log(`      ${bar(views, maxPageViews)}`);
  });

  // ── 3. Traffic Sources ─────────────────────────────────────────────────────
  const [sources] = await Promise.all([
    runReport('Traffic Sources', {
      dateRanges,
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 8,
    }),
  ]);

  console.log('\n── Traffic Sources ────────────────────────────────────────');
  const srcRows = sources.response.rows ?? [];
  const maxSrc = parseInt(srcRows[0]?.metricValues[0]?.value ?? 1);
  srcRows.forEach((row) => {
    const channel = row.dimensionValues[0].value.padEnd(22);
    const s = parseInt(row.metricValues[0].value);
    const pct = sessions > 0 ? ((s / sessions) * 100).toFixed(1) : '0.0';
    console.log(`  ${channel} ${fmt(s).padStart(6)} sessions  ${pct.padStart(5)}%  ${bar(s, maxSrc, 20)}`);
  });

  // ── 4. Top Countries ───────────────────────────────────────────────────────
  const [countries] = await Promise.all([
    runReport('Top Countries', {
      dateRanges,
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 8,
    }),
  ]);

  console.log('\n── Top Countries ──────────────────────────────────────────');
  const countryRows = countries.response.rows ?? [];
  const maxCountry = parseInt(countryRows[0]?.metricValues[0]?.value ?? 1);
  countryRows.forEach((row) => {
    const country = row.dimensionValues[0].value.padEnd(22);
    const s = parseInt(row.metricValues[0].value);
    const pct = sessions > 0 ? ((s / sessions) * 100).toFixed(1) : '0.0';
    console.log(`  ${country} ${fmt(s).padStart(6)} sessions  ${pct.padStart(5)}%  ${bar(s, maxCountry, 20)}`);
  });

  // ── 5. Devices ─────────────────────────────────────────────────────────────
  const [devices] = await Promise.all([
    runReport('Devices', {
      dateRanges,
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    }),
  ]);

  console.log('\n── Devices ────────────────────────────────────────────────');
  const deviceRows = devices.response.rows ?? [];
  const maxDevice = parseInt(deviceRows[0]?.metricValues[0]?.value ?? 1);
  deviceRows.forEach((row) => {
    const device = row.dimensionValues[0].value.padEnd(12);
    const s = parseInt(row.metricValues[0].value);
    const pct = sessions > 0 ? ((s / sessions) * 100).toFixed(1) : '0.0';
    console.log(`  ${device} ${fmt(s).padStart(6)} sessions  ${pct.padStart(5)}%  ${bar(s, maxDevice, 20)}`);
  });

  // ── 6. Daily trend (last 14 days) ─────────────────────────────────────────
  const [trend] = await Promise.all([
    runReport('Daily Trend', {
      dateRanges: [{ startDate: '14daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    }),
  ]);

  console.log('\n── Daily Sessions (last 14 days) ──────────────────────────');
  const trendRows = trend.response.rows ?? [];
  const maxDay = Math.max(...trendRows.map((r) => parseInt(r.metricValues[0].value)), 1);
  trendRows.forEach((row) => {
    const rawDate = row.dimensionValues[0].value; // YYYYMMDD
    const d = `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`;
    const s = parseInt(row.metricValues[0].value);
    console.log(`  ${d}  ${bar(s, maxDay, 25)} ${fmt(s).padStart(5)}`);
  });

  console.log('\n══════════════════════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('Error fetching GA4 data:', err.message);
  process.exit(1);
});
