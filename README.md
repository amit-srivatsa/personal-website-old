<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Amit Srivatsa — Personal Website

Welcome to the repository for [amitsrivatsa.com](https://amitsrivatsa.com).

This project is the personal portfolio, professional CV, and home for the strategic marketing & AI engineering work of **Amit Srivatsa**.

## 🛠 Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **UI Components**: [React](https://react.dev/) + [Lucide Icons](https://lucide.dev/)
- **CMS**: [Notion API](https://developers.notion.com/)
- **Image CDN**: [ImageKit](https://imagekit.io/)
- **Hosting**: [Firebase Hosting](https://firebase.google.com/docs/hosting)
- **CI/CD**: GitHub Actions

## 🏗 Architecture Details

The site uses a powerful static site generation setup. Instead of managing markdown files directly, long-form content (like blog posts) is authored in **Notion**.

A custom content pipeline handles the ingestion:
1. Hourly or upon push, `scripts/sync-notion.mjs` runs via GitHub Actions.
2. It fetches published data from the configured Notion database.
3. Relevant assets (like cover images and inline media) are automatically uploaded to ImageKit to maintain permanent Image URLs.
4. Rendered `.md` files are built statically via Astro, providing lightning-fast page loads.

## 🚀 Running Locally

If you want to run this setup locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/amit-srivatsa/personal-website.git
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Make a copy of `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   If you plan to run the Notion synchronization script, populate your API keys here. Environment variables like `PUBLIC_GA_MEASUREMENT_ID` should also be provided. 

4. **Start the local Dev Server**
   ```bash
   npm run dev
   ```

5. **Sync Notion Articles (Optional)**
   ```bash
   npm run notion:sync
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

## ⚖️ Privacy & Compliance

The site adheres to rigorous performance and privacy standards.
- Google Analytics 4 utilizes Consent Mode v2 out-of-the-box. Tracking defaults to `denied` until user consent is manually granted.
- Cookie consents are managed gracefully via `localStorage`.
- Comprehensive privacy procedures maintain GDPR compliance.

## 🤝 Contact

This repository serves as a personal codebase and public portfolio. For professional inquiries or consultation, please visit my site's [Contact](https://amitsrivatsa.com/contact) page or reach out on [LinkedIn](https://www.linkedin.com/in/amit-srivatsa/).
