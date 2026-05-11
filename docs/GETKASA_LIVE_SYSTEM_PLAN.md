# GetKasa Live System Plan

This document tracks the practical live-demo setup for the GetKasa product family.

## Production Demo Map

All public traffic should enter through one HTTPS reverse proxy on the AWS EC2 instance.
Only ports `80` and `443` should be open publicly.

| Purpose | Domain | Internal target |
| --- | --- | --- |
| Sales website | `getkasa.in`, `www.getkasa.in` | Future website app |
| Starter demo | `starter.getkasa.in` | Starter Next.js client |
| Starter API | `starter-api.getkasa.in` | Starter NestJS API |
| Enterprise demo | `enterprise.getkasa.in` | Enterprise Next.js client |
| Enterprise API | `enterprise-api.getkasa.in` | Enterprise NestJS API |
| License portal | `license.getkasa.in` | License portal Next.js app |

Required DNS records:

```text
A     @                13.206.210.16
A     www              13.206.210.16
A     starter          13.206.210.16
A     starter-api      13.206.210.16
A     enterprise       13.206.210.16
A     enterprise-api   13.206.210.16
A     license          13.206.210.16
```

## Demo Booking MVP

For the first release, avoid creating a new Docker stack for every visitor. A full per-visitor environment is expensive and slow on a small EC2 instance.

Use always-on product demos and create temporary demo accounts instead:

1. Visitor clicks `Take demo`.
2. Website collects name, email, product, and duration (`30` or `60` minutes).
3. Backend creates a demo session with an expiry time.
4. Backend creates temporary role-based accounts in the selected demo app.
5. Visitor receives a magic link or temporary credentials.
6. A scheduled cleanup job disables expired accounts and removes temporary data.
7. A nightly reset restores stable demo content.

This gives users a real dashboard quickly without needing a heavy orchestration layer.

## Later Upgrade

When traffic grows, add true isolated environments:

1. Use wildcard DNS such as `*.demo.getkasa.in`.
2. Queue a job to create a Docker Compose project per demo session.
3. Route `demo-<id>.demo.getkasa.in` to that stack.
4. Destroy the stack automatically after the selected TTL.

This needs more RAM, disk, and a worker queue, so it should come after the sales flow is proven.
