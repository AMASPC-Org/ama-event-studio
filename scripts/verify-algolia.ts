
import { algoliasearch } from 'algoliasearch';
import * as fs from 'fs';
import * as path from 'path';

// Load .env.local manually
let APP_ID = '';
let SEARCH_KEY = '';

try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim();
                if (key === 'NEXT_PUBLIC_ALGOLIA_APP_ID') APP_ID = value;
                if (key === 'NEXT_PUBLIC_ALGOLIA_SEARCH_KEY') SEARCH_KEY = value;
            }
        });
    }
} catch (e) {
    console.error('Error reading .env.local', e);
}

console.log(`Testing Algolia connection with:`);
console.log(`APP_ID: ${APP_ID}`);
console.log(`KEY: ${SEARCH_KEY ? '******' + SEARCH_KEY.slice(-4) : 'undefined'}`);

if (!APP_ID || !SEARCH_KEY) {
    console.log('Missing keys! This will likely cause the app to fallback to Mock Mode if configured correctly, but here we are testing the keys.');
    // If keys are missing, the app should use MOCK_MODE.
    // But if .env.local exists with empty values, it might be an issue.
}

if (APP_ID && SEARCH_KEY) {
    const client = algoliasearch(APP_ID, SEARCH_KEY);

    async function testConnection() {
        try {
            console.log('Sending search request to index: prod_EVENTS');
            const result = await client.search({
                requests: [
                    {
                        indexName: 'prod_EVENTS',
                        query: ''
                    }
                ]
            });
            console.log('Search successful!');
            const firstResult = result.results[0] as { nbHits?: number };
            console.log(`Hits: ${firstResult.nbHits ?? 'unknown'}`);
        } catch (error: unknown) {
            const err = error as { message?: string; status?: number };
            console.error('Search failed:', err.message);
            if (err.status) console.error('Status:', err.status);
        }
    }

    testConnection();
} else {
    console.log('Skipping connection test due to missing keys.');
}
