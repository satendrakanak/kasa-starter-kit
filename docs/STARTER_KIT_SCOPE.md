# kasa-starter-kit Scope

This repository is positioned as a lean LMS starter kit with a focused first-run product surface.

## Core Starter Modules

- Auth: login, register, email verification, password reset, optional social auth settings.
- Roles: admin and student.
- Courses: create/edit courses, categories, chapters, lessons, video URLs, file/PDF attachments, thumbnails, free/paid toggle.
- Learning: enrolled course access, continue watching, progress tracking, mark complete.
- Certificates: generated after completion with a simple template base.
- Payments: Razorpay-ready checkout, orders, coupons.
- Dashboards: student my courses/progress/certificates, admin courses/users/orders/sales overview.
- Basic CMS: site settings, landing content, articles, testimonials, contact leads, media, course thumbnails, instructor metadata.
- License: required activation through the kasa-starter-kit Licence Portal before installation completes.
- Installer: database setup, license activation, first admin creation, SMTP/storage settings through admin settings, optional demo import.

## Hidden Extension Modules

The codebase still contains modules that can be re-enabled for a larger edition:

- Faculty workspace and live classes.
- Exams and question bank.
- Engagement automation and broadcasts.
- Refund workflows.
- Moderation and Q&A/review expansion.

These are intentionally removed from the starter navigation and blocked from direct frontend routes so the first-run product feels focused.

## Cleanup Rule

When adding starter features, keep the public and admin navigation aligned with this scope. Add larger workflows behind an edition flag or a separate advanced branch instead of surfacing them by default.
