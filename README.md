# Alexander Morozov — Portfolio

Personal portfolio website showcasing my work as a Full-Stack Developer. Built with modern technologies and optimized for performance and SEO.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **i18n:** next-intl (Russian/English)
- **Theme:** next-themes (Dark/Light mode)

## Features

- Responsive design with mobile-first approach
- Smooth scroll animations and parallax effects
- Flip card project showcase with image carousel
- Dynamic OG image generation
- SEO optimized (JSON-LD, sitemap, robots.txt)
- Bilingual support (RU/EN) with auto-detection

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/alex-morozov84/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── layout.tsx     # Main layout with SEO
│   │   ├── page.tsx       # Home page
│   │   ├── opengraph-image.tsx
│   │   └── twitter-image.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Hero.tsx           # Hero section with parallax
│   ├── Services.tsx       # Services grid
│   ├── ProjectsGrid.tsx   # Projects showcase
│   ├── ProjectCard.tsx    # Flip card with carousel
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx
│   └── ScrollToTop.tsx
├── data/
│   └── projects.ts        # Projects data
└── i18n/
    ├── routing.ts
    └── request.ts
messages/
├── en.json                # English translations
└── ru.json                # Russian translations
```

---

## VPS Deployment

This section describes deployment to a VPS with nginx reverse proxy and automatic SSL.

### Prerequisites on VPS

- Docker and Docker Compose
- nginx reverse proxy setup (see `~/nginx/`)
- Certbot for SSL certificates

### Deploy Steps

#### 1. Upload code to server

```bash
# From local machine
rsync -avz --exclude node_modules --exclude .next \
  ./ alex@alex-morozov.com:~/portfolio/
```

Or use git:

```bash
# On VPS
cd ~
git clone https://github.com/alex-morozov84/portfolio.git
```

#### 2. Build and run container

```bash
# On VPS
cd ~/portfolio
docker compose up -d --build
```

#### 3. Add domain with SSL

```bash
cd ~/nginx
./add-domain.sh alex-morozov.com portfolio:3000 portfolio:3000
```

> Note: Both backend and frontend point to the same Next.js service since it handles everything.

#### 4. Verify deployment

```bash
# Check container status
docker compose ps

# Check logs
docker compose logs -f

# Test the site
curl -I https://alex-morozov.com
```

### Update Deployment

```bash
# From local machine
rsync -avz --exclude node_modules --exclude .next \
  ./ alex@alex-morozov.com:~/portfolio/

# On VPS
cd ~/portfolio
docker compose up -d --build
```

### Useful Commands

```bash
# Restart container
docker compose restart

# Stop container
docker compose down

# Rebuild without cache
docker compose build --no-cache

# View real-time logs
docker compose logs -f
```

---

## License

MIT
