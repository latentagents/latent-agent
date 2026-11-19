import { LatentPublicClient } from '../sdk/public-client.mjs';

const client = new LatentPublicClient();
try {
  console.log(JSON.stringify({ status: await client.status(), demo: await client.demo() }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Public API request failed');
  process.exitCode = 1;
}
