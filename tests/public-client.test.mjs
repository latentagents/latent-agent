import test from 'node:test';
import assert from 'node:assert/strict';
import { LatentPublicClient } from '../sdk/public-client.mjs';

test('public status and demo use GET without an account key', async () => {
  const seen = [];
  const client = new LatentPublicClient({ fetchImpl: async (url, options) => {
    seen.push(url);
    assert.equal(options.method, 'GET');
    assert.equal(options.headers.has('Authorization'), false);
    assert.equal(options.redirect, 'error');
    return Response.json(url.endsWith('/status') ? { workerOnline: false } : { available: false }, { status: url.endsWith('/status') ? 503 : 200 });
  }});
  assert.equal((await client.status()).workerOnline, false);
  assert.equal((await client.demo()).available, false);
  assert.deepEqual(seen, ['https://latentagents.xyz/api/v1/status', 'https://latentagents.xyz/api/v1/demo']);
});

test('trial issuance and reads use separate scoped endpoints', async () => {
  const client = new LatentPublicClient({ fetchImpl: async (url, options) => {
    if (url.endsWith('/trial')) {
      assert.equal(options.method, 'POST');
      assert.equal(options.headers.has('Authorization'), false);
      return Response.json({ apiKey: 'test-fixture' }, { status: 201 });
    }
    assert.equal(options.headers.get('Authorization'), 'Bearer test-fixture');
    assert.equal(options.method, 'GET');
    return Response.json({ error: 'Trial request limit reached.' }, { status: 429 });
  }});
  const trial = await client.issueTrial();
  await assert.rejects(client.trialDemo(trial.apiKey), /Trial request limit/);
});

test('client rejects insecure or ambiguous origins', () => {
  assert.throws(() => new LatentPublicClient({ origin: 'http://example.invalid' }), /HTTPS origin/);
  assert.throws(() => new LatentPublicClient({ origin: 'https://example.invalid/path' }), /HTTPS origin/);
});
