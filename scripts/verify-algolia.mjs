
import { algoliasearch } from 'algoliasearch';

const APP_ID = 'Y6495VQAFE';
const SEARCH_KEY = 'ddf3c58e777ed4f18ba6c32cef1b9272';

console.log(`Testing Algolia connection with hardcoded keys:`);
console.log(`APP_ID: ${APP_ID}`);

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
            // Check structure of result (v5 might be different)
            if (result.results && result.results[0]) {
                console.log(`Hits: ${result.results[0].nbHits}`);
            } else {
                console.log('Result structure:', JSON.stringify(result));
            }
        } catch (error) {
            console.error('Search failed:', error.message);
            if (error.status) console.error('Status:', error.status);
        }
    }

    testConnection();
}
