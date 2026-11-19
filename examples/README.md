# Developer examples

[API reference](../docs/developer-api.md)

`list-agents.mjs` is a dependency-free Node.js example that reads the agents and model providers visible to your developer key. It makes two authenticated GET requests and does not queue a task or change your account.

`public-proof.mjs` uses the same client implementation as the public website to request current runner status and the last published execution receipt. Run it with `node examples/public-proof.mjs` after the matching server version is deployed. It needs no credential and submits no task.

Requirements:

- Node.js 22 or later.
- A Latent Agent account and an API key with read access.
- A reachable HTTPS workspace.

From the repository root, in Bash:

```bash
read -r -s -p 'Latent API key: ' LATENT_API_KEY
export LATENT_API_KEY
printf '\n'
node examples/list-agents.mjs
unset LATENT_API_KEY
```

The displayed provider IDs can be used in the [task request reference](../docs/developer-api.md). Keep the example's output private if your agent names or configured providers identify unpublished work.

