# kasa-starter-kit Packaging

This document defines how kasa-starter-kit should be packaged for marketplace or direct self-hosted sales.

## Product Positioning

kasa-starter-kit is the sellable base edition. It includes the core LMS features needed to launch a course platform without exposing larger workflows.

Included:

- Authentication: login, register, password reset, email verification, optional Google/social settings.
- Roles: Admin and Student.
- Course management: courses, categories, chapters/sections, video lessons, PDF/file attachments, thumbnails, free/paid toggle.
- Student learning: my courses, continue watching, progress tracking, mark complete.
- Certificates: auto-generated completion certificates with a simple template foundation.
- Payments: Razorpay-ready checkout, orders, coupons.
- Dashboards: student courses/progress/certificates and admin courses/users/orders/sales overview.
- Basic CMS: site settings, landing content, articles, testimonials, contact leads, course thumbnails, instructor metadata, media.
- Installer: database setup, license activation, first admin creation, demo import, SMTP/storage settings through admin settings.

Not included in the default starter surface:

- Faculty workspace and live classes.
- Exams and question bank.
- Engagement automation and broadcasts.
- Refund workflows.
- Moderation and advanced review/Q&A workflows.

These modules may remain in the codebase as extension modules, but they should stay hidden and route-blocked in the starter edition.

## License Activation

The starter kit must require license activation during installation.

Required env values:

```bash
LICENSE_PORTAL_URL=https://license.your-domain.com
LICENSE_PRODUCT_SLUG=kasa-starter-kit
```

Local development can use:

```bash
LICENSE_PORTAL_URL=http://localhost:5000
LICENSE_PRODUCT_SLUG=kasa-starter-kit
```

When the API runs inside Docker, localhost license portal URLs are routed to `host.docker.internal` automatically.

## Packaging Checklist

- Keep starter navigation limited to the core modules.
- Keep disabled extension routes listed in `client/routes.ts`.
- Keep the installer activation step enabled.
- Keep Docker env examples aligned with `kasa-starter-kit` names.
- Verify `/install` requires a valid license before admin creation.
- Verify public nav shows Home, Courses, Articles, Testimonials, and Contact.
- Verify admin nav only shows starter admin modules.
- Verify direct frontend access to extension routes rewrites to not found.
- Verify bundled KASA logos are used by default:
  - `client/public/assets/kasa-logo-light.png`
  - `client/public/assets/kasa-logo-dark.png`
- Verify the buyer documentation in `docs/INSTALLATION_GUIDE.md` can install the product from a clean machine.
- Verify the screenshot list in `docs/SCREENSHOTS.md` matches the screenshots bundled in `screenshots/`.
- Zip only source, docs, scripts, env examples, and screenshots. Do not include `node_modules`, `.next`, `dist`, local `.env` files, or Docker volumes.

## Envato Upload Package

Recommended final ZIP contents:

```text
kasa-starter-kit/
  client/
  server/
  scripts/
  docs/
  screenshots/
  docker-compose.yml
  docker-compose.prod.yml
  .env.docker.example
  .env.production.example
  .env.production.local.example
  README.md
```

You can generate a clean local ZIP with:

```bash
./scripts/build-envato-package.sh
```

The ZIP is written to `.temp/kasa-starter-kit-envato.zip`.

Required buyer-facing documents:

- `README.md`: product overview and quick start.
- `docs/INSTALLATION_GUIDE.md`: step-by-step buyer install guide.
- `docs/ENVATO_SUBMISSION.md`: item description, tags, requirements, and review checklist.
- `docs/SCREENSHOTS.md`: screenshot captions and suggested listing order.
- `docs/CHANGELOG.md`: release history.

## Suggested Editions

- kasa-starter-kit: current repository scope.
- Pro Edition: add exams, refunds, moderation, and advanced reviews.
- Scale Edition: add faculty workspace, live classes, batches, recordings, engagement automation, and advanced reporting.
