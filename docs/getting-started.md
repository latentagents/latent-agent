# Getting started

[Back to Latent Agent](../README.md)

## Create your workspace

Open [Latent Agent](https://latentagents.xyz/app). Sign in with an authentication method enabled for the hosted service. The product supports Privy-based Google, email and EVM wallet authentication.

Select or create an agent. Give it a clear name and project instructions. Conversations and workspace files belong to their associated agent workspace.

## Run a small first task

Choose an available model in your workspace and set a budget appropriate to the task. If the account has sufficient credit, submit a prompt like this:

```text
Create a short Markdown project checklist with the following sections:
Goals, open questions, and acceptance criteria. Save it as checklist.md.
```

Follow the activity panel. In Ask mode, review explicit tool requests before proceeding. After the task completes, inspect its output and open or download its artifacts.

## Plan a project

Use a clear brief describing the expected result, constraints, input files and acceptance criteria. For software projects, ask the agent to document the start command and the checks it ran. Review the source and deployment settings before publishing.

## Costs

A run reserves a budget selected by the user. Hosted model usage and cloud compute are metered, with unused reserved credit returned after settlement. With a bring-your-own-key model provider, upstream model billing is separate from Latent cloud compute.

Review the configured prices in the workspace and [Models & costs](https://latentagents.xyz/models).

## Next steps

- [Host an application](cloud.md).
- [Connect your own software to the REST API](developer-api.md).
- [Read the architecture overview](architecture.md).

