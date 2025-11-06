# 🌐 Cyber Portfolio

A modern, immersive cyberpunk-themed portfolio with dynamic administration.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)

## ✨ Features

- 🎨 Immersive design with scroll-snap navigation
- 🌍 i18n support (French/English) with `next-intl`
- 📝 Complete admin panel for content management
- 🔐 PGP key integration
- 💼 Dynamic projects showcase
- 📧 Contact form
- 🔒 Secure authentication with `iron-session`
- ⚡ Terminal emulator with custom commands
- 🎨 3D graphics with Three.js

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration (see below)

# Generate Prisma client
npx prisma generate

# Initialize database
npx prisma migrate dev

# Seed initial data (creates admin user)
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Important**: Before running `npm run db:seed`, make sure you've configured `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your `.env.local` file. These will be your admin credentials.

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── admin/       # Admin panel
│   ├── api/         # API routes
│   └── [locale]/    # Localized pages
├── components/       # React components
│   ├── immersive/   # Immersive theme components
│   ├── OS/          # OS-style theme components
│   └── CyberSite/   # Cyber theme components
├── lib/             # Utility functions
│   ├── auth.ts      # Authentication helpers
│   ├── prisma.ts    # Prisma client
│   └── session.ts   # Session management
└── i18n/            # Internationalization
    └── messages/    # Translation files

prisma/
├── schema.prisma    # Database schema
└── migrations/      # Database migrations

public/              # Static assets
```

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Database**: SQLite + Prisma ORM
- **Authentication**: iron-session
- **UI Framework**: TailwindCSS 4
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **i18n**: next-intl
- **Form Validation**: Zod
- **Icons**: Phosphor Icons

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npx prisma studio        # Open Prisma Studio (DB GUI)
npx prisma migrate dev   # Create new migration
npm run db:seed          # Seed database with initial data

# Prisma
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
```

## 🔐 Admin Panel

### Access

The admin panel is accessible at `/admin` after logging in at `/login`.

### Creating an Admin User

Admin users are created during the database seeding process. The credentials are defined in your environment variables:

**Step 1**: Set your admin credentials in `.env.local`:

```env
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
```

**Step 2**: Run the seed script to create the admin user:

```bash
npm run db:seed
```

This will create (or update) an admin user with the credentials specified in your `.env.local` file.

### Managing Content

Once logged in to the admin panel (`/admin`), you can manage:

#### 1. **Site Content** (`/admin/site`)
- Hero section (title, subtitle, description)
- About section (title, content)
- Manifesto section (title, content)
- Contact email
- Theme settings (Professional, Cyber, OS-style)
- CRT effect toggle

#### 2. **Projects** (`/admin/projects`)
- Create, edit, and delete projects
- Set project title, description, technologies used
- Add images and links
- Order projects by display priority
- Set slug for URL-friendly project pages

#### 3. **Testimonials** (`/admin/testimonials`)
- Add and manage client testimonials
- Set author name and role
- Edit testimonial content
- Show/hide testimonials

#### 4. **PGP Key** (`/admin/pgp`)
- Upload and manage your PGP public key
- Set key fingerprint, ID, algorithm
- Set expiration date
- Public key is displayed on the main site and available for download

### Resetting Admin Password

If you need to reset the admin password:

1. Update `ADMIN_PASSWORD` in your `.env.local`
2. Run: `npm run db:seed`

The seed script uses "upsert" logic, so it will update the existing admin user's password without creating a duplicate.

## 🌍 Internationalization

The project supports multiple languages using `next-intl`. Translation files are located in:
- `src/i18n/messages/fr.json` (French)
- `src/i18n/messages/en.json` (English)

Add more languages by creating new JSON files and updating the configuration.

## 🎨 Themes

The portfolio includes multiple theme options:

1. **Professional**: Clean, modern design
2. **Cyber**: Cyberpunk aesthetic with neon effects
3. **OS**: Operating system-style interface

Themes can be switched through the admin panel.

## 📦 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# Session (REQUIRED - must be at least 32 characters)
SESSION_PASSWORD="your-secret-session-password-min-32-chars"

# Admin credentials (used by npm run db:seed)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"

# App
NODE_ENV="development"
PORT=3000
```

### Environment Variables Explained

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Path to SQLite database. For production, can use PostgreSQL or MySQL connection string |
| `SESSION_PASSWORD` | Yes | Secret key for session encryption. **Must be at least 32 characters**. Generate with: `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Yes | Email/username for the admin user (used during seeding) |
| `ADMIN_PASSWORD` | Yes | Password for the admin user (used during seeding) |
| `NODE_ENV` | No | `development` or `production` |
| `PORT` | No | Server port (default: 3000) |

⚠️ **Security Notes**: 
- Never commit your `.env.local` file to version control
- Use strong passwords in production
- Generate a secure `SESSION_PASSWORD` with: `openssl rand -base64 32`
- Change default credentials before deploying

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Database Setup

The project uses SQLite by default. For production, consider using PostgreSQL or MySQL by updating the `DATABASE_URL` in your environment variables and the `provider` in `prisma/schema.prisma`.

### Environment Variables

Make sure to set all required environment variables on your hosting platform.

### Hosting Options

This project can be deployed on:
- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)
- Any Node.js hosting platform
- Self-hosted with PM2 or Docker

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by cyberpunk and cypherpunk aesthetics
- Matrix rain effect for nostalgic vibes
- Built with modern web technologies

---

**Made with ❤️ and a lot of cyberpunk** 🌃

