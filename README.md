# Alexander Morozov — Portfolio

Personal portfolio website showcasing my work as a Full-Stack Developer. Built with modern technologies and optimized for performance and SEO.

**Live:** [alex-morozov.com](https://alex-morozov.com)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **i18n:** next-intl (Russian/English)
- **Theme:** next-themes (Dark/Light mode)
- **Carousel:** Embla Carousel
- **Lightbox:** yet-another-react-lightbox

## Features

- Responsive design with mobile-first approach
- Smooth scroll animations and parallax effects
- Flip card project showcase with image carousel and lightbox
- Contact form with Telegram notifications
- Dynamic OG image generation
- SEO optimized with JSON-LD schemas (Person, FAQPage)
- Bilingual support (RU/EN) with auto-detection
- PWA-ready with manifest.json

## Sections

- **Hero** — Introduction with CTA and contact buttons
- **Services** — What I offer
- **Projects** — Featured work with flip cards
- **Process** — How I work (4-step workflow)
- **FAQ** — Frequently asked questions
- **Contact** — Contact form with validation

## Getting Started

### Prerequisites

- Node.js 22+
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

### Environment Variables

For the contact form to work, create a `.env` file:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

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
│   ├── [locale]/              # Locale-based routing
│   │   ├── layout.tsx         # Main layout with SEO
│   │   ├── page.tsx           # Home page
│   │   └── opengraph-image.tsx
│   ├── api/contact/           # Contact form API
│   ├── not-found.tsx          # Custom 404 page
│   ├── globals.css
│   └── sitemap.ts
├── components/
│   ├── project/               # Project card components
│   │   ├── ProjectCard.tsx
│   │   ├── CardFront.tsx
│   │   ├── CardBack.tsx
│   │   └── ImageCarousel.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── ProjectsGrid.tsx
│   ├── FAQ.tsx
│   ├── ContactForm.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── data/
│   └── projects.ts            # Projects data
├── lib/
│   └── animations.ts          # Animation constants
└── i18n/
    └── routing.ts
messages/
├── en.json                    # English translations
└── ru.json                    # Russian translations
public/
├── images/                    # Project screenshots
├── manifest.json              # PWA manifest
└── robots.txt
```

## Docker Deployment

```bash
# Build and run
docker compose up -d --build

# View logs
docker compose logs -f

# Restart
docker compose restart
```

The container exposes port 3000. Configure your reverse proxy (nginx, traefik, etc.) to route traffic to it.

## License

MIT
