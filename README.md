# 🚀 ProductHunt Launches & Topics Scraper

Extract newly launched products, trending AI tools, and SaaS from **ProductHunt** across tech, AI, developer tools, productivity, and marketing categories.

---

## 🌟 Why Use ProductHunt Scraper?

ProductHunt is the premier launchpad for new technology products, startups, and AI tools. This Actor provides an automated feed of the newest products, taglines, links, and publication dates directly to CSV, JSON, or Excel.

* 🤖 **Category-Specific Extraction:** Filter by AI, Developer Tools, Productivity, Marketing, Design Tools, or all top launches.
* 📝 **Clean Pitches & Taglines:** Extract the exact one-liner value proposition for every product.
* ⚡ **Lightning Fast & Lightweight:** Runs in 2 seconds with virtually zero compute cost.
* 📊 **Export Anywhere:** Download your data in CSV/JSON/Excel or connect to Google Sheets, Make, Zapier, or Airtable.

---

## 📥 Input Options

| Parameter | Type | Default | Description |
|---|---|---|---|
| `category` | String | `"all"` | Category: `all`, `ai`, `tech`, `developer-tools`, `productivity`, `marketing`, `design-tools`. |
| `maxProducts` | Integer | `50` | Maximum number of products to scrape. |
| `proxyConfiguration` | Object | `null` | Optional proxy configuration. |

---

## 📤 Sample Output (JSON)

```json
{
  "name": "Clamor",
  "tagline": "Turns social signals into actionable insights",
  "url": "https://www.producthunt.com/products/clamor-2",
  "category": "ai",
  "postId": "1319349",
  "publishedAt": "2026-11-17T02:49:07-08:00",
  "updatedAt": "2026-11-17T02:49:07-08:00",
  "scrapedAt": "2026-11-17T11:44:00.000Z"
}
```

---

## 💼 High-Value Use Cases

1. **SaaS & AI Competitor Tracking:** Monitor what new tools are launching daily in your niche.
2. **Founder Outreach:** Reach out to founders on launch day when they are most responsive.
3. **Curated Tech Newsletters & Twitter Bots:** Automate daily "Top 5 AI tools launched today" posts.
