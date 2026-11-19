# Developer API

[Back to Latent Agent](../README.md)

The developer interface uses JSON over HTTPS and account-scoped bearer keys. Create and revoke keys in workspace Settings. Keep them in a private environment variable on your server. Never embed a developer key in browser code or commit it to a repository.

Base URL: `https://latentagents.xyz/api/v1`

The [public API reference](public-proof.md) covers the no-login status, published demo and limited trial key. These are separate from account developer keys. The [JavaScript client](../sdk/public-client.mjs) is used by the public demo page.

## First request

Set `LATENT_API_KEY` in your environment using your preferred secret manager or a hidden shell prompt. Then list agents:

```bash
curl --fail-with-body 'https://latentagents.xyz/api/v1/agents' \
  -H "Authorization: Bearer $LATENT_API_KEY"
```

This endpoint returns an array of agent records with their IDs, names and modes. To discover provider record IDs, call `/providers` in the same way. These IDs are distinct from model names.

```bash
node examples/list-agents.mjs
```

The example in this repository also lists configured model providers. See [examples](../examples/README.md) for requirements.

## Endpoint reference

| Method | Relative path | Request / result |
| --- | --- | --- |
| GET | `/agents` | List your agents. |
| GET | `/providers` | List available providers and public pricing. |
| GET | `/conversations` | List recent conversations. |
| POST | `/conversations` | Create using `agentId` and `title`; returns `id`. |
| GET | `/conversations/:id` | Read conversation, messages, files and approvals. |
| POST | `/conversations/:id/messages` | Queue a task with `prompt`, `providerId`, `budgetMicros`; returns its run `id`. |
| GET | `/runs/:id/events?after=0` | Read status and incremental events. |
| POST | `/runs/:id/cancel` | Request cancellation. |
| POST | `/conversations/:id/fork` | Branch an idle conversation and its workspace. |
| GET | `/conversations/:id/export` | Download the conversation in Markdown. |

The `runs:read` scope covers GET requests, and `runs:write` is required for mutations. API requests cannot approve actions or sign payments. The user handles required approvals in their signed-in workspace.

## Create a conversation and request a task

Use a configured, account-owned agent and available provider ID. The following request bodies illustrate the two operations. Replace all placeholder IDs before submitting. Submitting a task can reserve and consume credit.

`POST /conversations`:

```json
{
  "agentId": "YOUR_AGENT_ID",
  "title": "Project checklist"
}
```

A successful response returns HTTP 201 and `{"id":"..."}`. Use that conversation ID with `POST /conversations/:id/messages`:

```json
{
  "prompt": "Create a Markdown checklist with goals and acceptance criteria.",
  "providerId": "YOUR_PROVIDER_ID",
  "budgetMicros": 250000
}
```

JSON requests need `Content-Type: application/json`. A successful task submission returns HTTP 202 with the run ID. `budgetMicros` uses integer USD micros, where `1,000,000` means $1. The accepted range is $0.01–$100 per run.

Read `/runs/:id/events?after=0` to inspect progress. Advance `after` to the largest event ID received and finish polling once the status is completed, failed or cancelled. A conversation admits one active run at a time. Cancellation is a request and does not reverse effects already completed.

## Errors

| HTTP status | Meaning |
| --- | --- |
| 401 | Missing or invalid developer key. |
| 403 | Insufficient permission or scope. |
| 404 | Requested resource unavailable to the account. |
| 409 | Resource conflicts with its current state. |
| 429 | Rate limit reached. |

Check the returned error message in your own client. Avoid blind retries of a task submission after an ambiguous response. Inspect the existing conversation first.

For more product information, visit the [online developer guide](https://latentagents.xyz/docs/developers).

