/** Small, dependency-free client used by the Latent public demo page. */
export class LatentPublicClient {
  /** @param {{origin?: string, fetchImpl?: typeof fetch}} [options] */
  constructor({ origin = 'https://latentagents.xyz', fetchImpl = globalThis.fetch } = {}) {
    const url = new URL(origin);
    if (url.username || url.password || url.search || url.hash || url.pathname !== '/' ||
        (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname)))) {
      throw new Error('Provide an HTTPS origin, or an HTTP localhost origin.');
    }
    this.origin = url.origin;
    this.fetchImpl = fetchImpl;
  }

  /** @param {string} path @param {string} [method] @param {string} [key] */
  async request(path, method = 'GET', key) {
    const headers = new Headers({ Accept: 'application/json' });
    if (key) headers.set('Authorization', `Bearer ${key}`);
    const response = await this.fetchImpl(`${this.origin}/api/v1/${path}`, {
      method, headers, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(15000),
    });
    const data = await response.json();
    // A 503 on a status endpoint can be a real, useful health reading.
    const health = (path === 'status' || path === 'trial/status') && response.status === 503 && typeof data.workerOnline === 'boolean';
    if (!response.ok && !health) throw new Error(data.error || `HTTP ${response.status}`);
    return data;
  }

  status() { return this.request('status'); }
  demo() { return this.request('demo'); }
  issueTrial() { return this.request('trial', 'POST'); }
  /** @param {string} key */
  trialStatus(key) { return this.request('trial/status', 'GET', key); }
  /** @param {string} key */
  trialDemo(key) { return this.request('trial/demo', 'GET', key); }
}
