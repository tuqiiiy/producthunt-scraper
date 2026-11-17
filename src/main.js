import { Actor, log } from 'apify';
import { gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';

await Actor.init();

const input = (await Actor.getInput()) || {};
const {
    category = 'all',
    maxProducts = 50,
    proxyConfiguration,
} = input;

const proxyConfig = proxyConfiguration ? await Actor.createProxyConfiguration(proxyConfiguration) : undefined;

const CATEGORY_MAP = {
    'all': 'https://www.producthunt.com/feed',
    'ai': 'https://www.producthunt.com/feed?category=ai',
    'tech': 'https://www.producthunt.com/feed?category=tech',
    'developer-tools': 'https://www.producthunt.com/feed?category=developer-tools',
    'productivity': 'https://www.producthunt.com/feed?category=productivity',
    'marketing': 'https://www.producthunt.com/feed?category=marketing',
    'design-tools': 'https://www.producthunt.com/feed?category=design-tools',
};

log.info('--- Starting ProductHunt Launches Scraper ---');
log.info(`Category: ${category}`);
log.info(`Max Products: ${maxProducts}`);

const feedUrl = CATEGORY_MAP[category] || CATEGORY_MAP['all'];
const proxyUrl = proxyConfig ? await proxyConfig.newUrl() : undefined;

try {
    log.info(`Fetching ProductHunt feed: ${feedUrl}`);
    const response = await gotScraping({
        url: feedUrl,
        proxyUrl,
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'accept': 'application/atom+xml,application/xml,text/xml,*/*',
        },
        timeout: { request: 20000 },
        retry: { limit: 2 },
    });

    const $ = cheerio.load(response.body, { xmlMode: true });
    const entries = $('entry');
    log.info(`Found ${entries.length} product entries in feed.`);

    let count = 0;
    for (let i = 0; i < entries.length; i++) {
        if (count >= maxProducts) break;

        const el = $(entries[i]);
        const name = el.find('title').text().trim();
        const url = el.find('link').attr('href') || '';
        const rawId = el.find('id').text().trim();
        const postId = rawId.includes('Post/') ? rawId.split('Post/')[1] : rawId;
        const publishedAt = el.find('published').text().trim() || null;
        const updatedAt = el.find('updated').text().trim() || null;

        // Parse tagline & description from content HTML
        const contentHtml = el.find('content').text() || '';
        let tagline = '';
        if (contentHtml) {
            const $content = cheerio.load(contentHtml);
            tagline = $content('p').first().text().trim();
        }

        const record = {
            name,
            tagline,
            url,
            category: category === 'all' ? 'Featured' : category,
            postId,
            publishedAt,
            updatedAt,
            scrapedAt: new Date().toISOString(),
        };

        await Actor.pushData(record);
        count++;
        log.info(`[${count}] "${name}" - ${tagline} (${url})`);
    }

    log.info(`\n🎉 Successfully extracted ${count} ProductHunt launches!`);
} catch (err) {
    log.error(`Failed to fetch ProductHunt launches: ${err.message}`);
}

await Actor.exit();
