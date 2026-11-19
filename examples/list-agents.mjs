const baseUrl = 'https://latentagents.xyz/api/v1';
const apiKey = process.env.LATENT_API_KEY;

if (!apiKey) {
  console.error('Set LATENT_API_KEY before running this example.');
  process.exitCode = 1;
} else {
  try {
    async function readList(path) {
      const response = await fetch(`${baseUrl}/${path}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(15000),
        redirect: 'error',
      });
      if (!response.ok) {
        throw new Error(`${path}: HTTP ${response.status}`);
      }
      const records = await response.json();
      if (!Array.isArray(records)) {
        throw new Error(`${path}: unexpected response format`);
      }
      return records;
    }

    const [agents, providers] = await Promise.all([
      readList('agents'),
      readList('providers'),
    ]);

    console.log('Your agents');
    console.table(agents.map(({ id, name, mode }) => ({ id, name, mode })));
    console.log('Available model providers');
    console.table(providers.map(({ id, name, model }) => ({ id, name, model })));
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'API request failed');
    process.exitCode = 1;
  }
}

