# Cloud tasks and application hosting

[Back to Latent Agent](../README.md)

## Tasks

An admitted cloud task runs in a server-side execution environment. The browser shows its recorded progress and output, so you can return to the conversation after disconnecting. Each run has an explicit budget and resource limits. Cancellation requests stop ongoing work where possible; external effects that already occurred may remain.

## Host an application

The Cloud workspace supports the application deployment flow:

1. Build or import a small web project in a conversation.
2. Check that the start command works, and that the application binds to `0.0.0.0` on its configured internal port.
3. Review its deployment command, port, memory and displayed compute rate.
4. Deploy through the workspace and inspect its logs and assigned URL.

Hosted applications may receive an address such as `https://<app-slug>.latentagents.xyz`. Public hosting requires the installation's app-domain routing and HTTPS to be operational.

## Manage a service

Use Cloud controls for logs, start, stop and restart. A web app may sleep when idle and wake on a subsequent visit. Persistent services have a separate lifecycle. Compute charges depend on the configured rate, resource allocation and active runtime.

## Store results

Conversation artifacts and snapshots help preserve work. Applications have bounded persistent data storage, separate from their working directory. Checkpoints are not a substitute for independent backups, and restoring files does not reverse external operations.

Review the needs of your application before moving important data into a hosted service.

