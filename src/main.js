import 'dotenv/config';
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

async function run() {
  if (!process.env.APIFY_TOKEN) {
    throw new Error('APIFY_TOKEN is not set. Copy .env.example to .env and add your token.');
  }

  const input = {
    brand: 'apple',
    model: 'iphone 13',
    category: 'mobile',
    city: 'gurgaon',
    pincode: '122001',
    maxItems: 100,
    proxyConfiguration: {
      useApifyProxy: true,
      apifyProxyGroups: ['RESIDENTIAL'],
      apifyProxyCountry: 'IN',
    },
  };

  const { defaultDatasetId } = await client.actor('getascraper/cashify-scraper').call(input);

  const { items } = await client.dataset(defaultDatasetId).listItems({ limit: 10 });

  console.table(items);
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
