# Public demo and trial API

[Back to Latent Agent](../README.md) · [Run demo](https://latentagents.xyz/demo) · [Developer guide](https://latentagents.xyz/docs/developers)

Available with the matching 0.2.9 server release. The public demo is a reviewed recording of a real operator run. A pending publication is returned explicitly; no fabricated sample is substituted.

| Method | Endpoint | Authentication |
| --- | --- | --- |
| GET | `/api/v1/status` | None |
| GET | `/api/v1/demo` | None |
| POST | `/api/v1/trial` | None; no request body required |
| GET | `/api/v1/trial/status` | Trial bearer key |
| GET | `/api/v1/trial/demo` | Trial bearer key |

Status returns the current database and runner heartbeat. HTTP 503 represents a stale heartbeat or database failure. This is not an inference-provider health test.

The demo response is either `available: false` or `available: true` with the reviewed receipt. The receipt includes the prompt, output, activity groups, execution timestamps, duration, recorded usage, reserved budget, charged credit and external costs. The model identifier reflects provider configuration at review. Internal event payloads and account identifiers are omitted.

## Free API trial

Use the [public demo page](https://latentagents.xyz/demo) to receive a temporary key. Each key has 20 reads and expires after 30 minutes. Issuance is globally rate limited. Trial keys cannot create runs, access private workspaces or spend credit.

```js
import { LatentPublicClient } from '../sdk/public-client.mjs';

const client = new LatentPublicClient();
const trial = await client.issueTrial();
const status = await client.trialStatus(trial.apiKey);
console.log(status);
```

Requests with a valid trial key return the remaining count in `X-Trial-Requests-Remaining`. Expired or missing keys return 401; exhausted keys return 429. Keys are separate from account credentials.

## Verify the client

```bash
npm test
node examples/public-proof.mjs
```

The tests use synthetic offline response fixtures; live output is obtained only by calling the hosted endpoint.
