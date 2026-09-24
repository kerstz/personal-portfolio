# Personal Portfolio

A bilingual (FR/EN) developer portfolio with a self-hosted admin panel to manage its content: projects, testimonials, about/manifesto sections and a PGP public key.

[![CI](https://github.com/kerstz/personal-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/kerstz/personal-portfolio/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

<img width="1732" height="872" alt="Portfolio home page" src="https://github.com/user-attachments/assets/6af1a3f7-76b6-4a1d-aaa1-90d7a6a2105a" />
<img width="1751" height="868" alt="Portfolio projects section" src="https://github.com/user-attachments/assets/518ce30f-da3c-43ca-9d65-b63f9365e04b" />

## Features

- **Content managed from the admin panel**: hero, about, manifesto, projects, testimonials, PGP key
- **French / English** content, switchable at runtime
- **Project pages** with status, stack and links
- **Contact form** via [Formspree](https://formspree.io)
- **Security-first**: see [Security](#security)

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript 5 |
| Data | Prisma 6 + SQLite |
| Auth | iron-session (encrypted, stateless cookie) + bcrypt |
| Validation | Zod |
| Styling | Tailwind CSS 4, Framer Motion |

## Getting started

**Requirements:** Node.js 22+ (see `.nvmrc`), npm.

```bash
git clone https://github.com/kerstz/personal-portfolio.git
cd personal-portfolio
npm install

cp .env.example .env.local   # then fill in the values (see below)

npm run db:migrate           # create the SQLite database
npm run db:seed              # create the admin account + default content
npm run dev
```

The site runs on <http://localhost:3000> and the admin panel on <http://localhost:3000/login>.

## Configuration

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | yes | SQLite path, relative to `prisma/schema.prisma` (e.g. `file:./dev.db`) |
| `SESSION_PASSWORD` | yes | Session encryption key, **32+ characters**: `openssl rand -base64 32` |
| `ADMIN_EMAIL` | for seeding | Admin login |
| `ADMIN_PASSWORD` | for seeding | Admin password, 12+ characters |
| `NEXT_PUBLIC_FORMSPREE_ID` | no | Formspree form ID for the contact form |

Running `npm run db:seed` again updates the admin password from `ADMIN_PASSWORD`. Use it to reset the password.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm run db:migrate` | Create/apply migrations (development) |
| `npm run db:deploy` | Apply migrations (production) |
| `npm run db:seed` | Create or update the admin account |

## Project structure

```
src/
├── app/
│   ├── [locale]/        # Public site (/fr, /en)
│   ├── projects/[slug]/ # Project detail pages
│   ├── login/           # Admin sign-in
│   ├── admin/           # Admin panel
│   └── api/             # Public (read-only) and admin API routes
├── components/          # UI components
├── lib/                 # Auth, session, validation, rate limiting, Prisma client
├── i18n/messages/       # FR/EN strings
└── middleware.ts        # Admin route protection
prisma/                  # Schema and migrations
```

## Security

- Admin API routes require an authenticated session. Every write is validated with Zod: only `http(s)` URLs are accepted and field sizes are bounded.
- Session cookie is encrypted, `HttpOnly`, `SameSite=Strict`, `__Host-` prefixed in production, and expires after 8 hours.
- Mutating requests are checked for same-origin (CSRF defense in depth).
- Login is rate limited per IP and per account, and takes the same time whether or not the account exists.
- Strict security headers: CSP, HSTS, `frame-ancestors 'none'`, Permissions-Policy, COOP.
- CI runs `npm audit` on every change. Dependabot keeps dependencies and GitHub Actions up to date.

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## Deployment

The `Deploy` workflow runs after CI passes on `main`. It connects to the server over SSH and rebuilds the Docker Compose stack. It needs these repository secrets: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_KEY` and, recommended, `DEPLOY_HOST_FINGERPRINT`.

For any other Node.js host:

```bash
npm ci && npm run db:deploy && npm run build && npm start
```

Serve the app over HTTPS behind a reverse proxy (e.g. Caddy, Nginx or Cloudflare).

## License

[MIT](LICENSE)
