<div align="center">
  <img src="assets/latent-avatar.png" alt="Latent Agent" width="96" />
  <h1>Latent Agent</h1>
  <p><strong>A cloud workspace for AI agents.</strong></p>
  <p>Build apps, run code, and automate recurring work from one workspace.</p>
  <p><a href="https://latentagents.xyz/">Website</a> · <a href="https://latentagents.xyz/app">Workspace</a> · <a href="https://latentagents.xyz/demo">Public demo &amp; trial</a> · <a href="https://latentagents.xyz/status">Status</a> · <a href="docs/developer-api.md">Developer API</a> · <a href="https://x.com/latentagentsxyz">X</a></p>
</div>

---

## What is Latent?

Latent provides a workspace in which you can give an AI agent a task, review its progress and work with the resulting files. Tasks run in the cloud, and application projects can be deployed with a dedicated address through the Cloud workspace.

This repository contains public product documentation and the JavaScript client used by the Latent public demo. Model, hosting and integration availability depends on the live service configuration.

## Try the JavaScript client

The dependency-free client in [`sdk/public-client.mjs`](sdk/public-client.mjs) reads runner status and published execution receipts. Release 0.2.9 adds the following public API contract. Deploying the matching server release is required for these endpoints.

```js
import { LatentPublicClient } from './sdk/public-client.mjs';

const client = new LatentPublicClient();
console.log(await client.status());
console.log(await client.demo());
```

With Node.js 22+, run `node examples/public-proof.mjs` to make those two requests, or `npm test` to verify the client against offline response fixtures. For the free, limited API trial, see [Public demo and trial](docs/public-proof.md).

## Capabilities

| Capability | Description |
| --- | --- |
| Agent workspace | Separate conversations, instructions, editable memory, files and activity for each agent. |
| Software development | Read and edit project files, run commands, and produce downloadable results. |
| Cloud tasks | Continue an admitted task on the execution server after closing your browser. |
| Application hosting | Configure a start command, port and memory allocation, and manage the resulting app. |
| Automation | Set recurring tasks and review the history of each scheduled run. |
| Workflow Studio | Connect agent steps in an ordered workflow with per-step budgets. |
| Model providers | Select a configured hosted model or connect your own compatible provider. |
| Developer interface | Scoped REST API keys for agent discovery and conversation/run management. |
| Integrations | MCP and GitHub connections where configured, with action approval. |
| Wallet and media | Optional adapters that require separate provider and network configuration. |

## A typical workflow

1. Sign in to the workspace using an enabled authentication method.
2. Create an agent or select an existing one, choose a model and set a run budget.
3. Describe the outcome, attach files if necessary, and review the generated result.
4. Approve required actions and download the result, or review deployment settings in Cloud.
5. For work that recurs, configure a schedule and its per-run budget.

## Documentation

- [Getting started](docs/getting-started.md) — your first agent and task.
- [Cloud and hosting](docs/cloud.md) — app lifecycle and storage.
- [Architecture](docs/architecture.md) — how the workspace, worker and gateways fit together.
- [Developer API](docs/developer-api.md) — authentication, endpoint reference and code examples.
- [Public demo and trial](docs/public-proof.md) — the runner status and published execution record API.
- [Examples](examples/README.md) — a runnable, read-only API client.
- [Roadmap](ROADMAP.md) and [changelog](CHANGELOG.md) — product direction and recorded updates.
- [Security and issue reporting](SECURITY.md) — reporting guidance.

## Platforms

| Platform | Status |
| --- | --- |
| Web | Current product interface |
| macOS | Coming soon |
| Windows | Coming soon |

See the [desktop page](https://latentagents.xyz/download) for release information.

The execution engine builds on the open-source Letronna Rust engine. See [third-party attribution](NOTICE.md) for provenance and license information.

## Feedback

Use GitHub Issues for product feedback, documentation corrections and reproducible bug reports. Do not include private workspace data, credentials or wallet secrets in an issue. For private security concerns, see [SECURITY.md](SECURITY.md).

