# Alexander Morozov — Portfolio

Personal portfolio website showcasing my work as a Full-Stack Developer. Built with modern technologies and optimized for performance and SEO.

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
- Dynamic OG image generation
- SEO optimized (JSON-LD, sitemap, robots.txt)
- Bilingual support (RU/EN) with auto-detection

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
│   │   ├── opengraph-image.tsx
│   │   └── twitter-image.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── project/               # Project card components
│   │   ├── ProjectCard.tsx    # Flip card container
│   │   ├── CardFront.tsx      # Front side with carousel
│   │   ├── CardBack.tsx       # Back side with details
│   │   └── ImageCarousel.tsx  # Embla carousel + lightbox
│   ├── Hero.tsx               # Hero section with parallax
│   ├── Services.tsx           # Services grid
│   ├── ProjectsGrid.tsx       # Projects showcase
│   ├── Header.tsx             # Navigation header
│   ├── Footer.tsx
│   └── ScrollToTop.tsx
├── data/
│   └── projects.ts            # Projects data
├── lib/
│   └── animations.ts          # Animation constants
└── i18n/
    ├── routing.ts
    └── request.ts
messages/
├── en.json                    # English translations
└── ru.json                    # Russian translations
public/
└── images/                    # Project screenshots
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
