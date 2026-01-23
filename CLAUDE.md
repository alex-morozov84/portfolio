# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

Portfolio site for alex-morozov.com with bento-grid project cards and demo links to subdomains.

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **i18n**: next-intl (Russian/English with auto-detection via Accept-Language header)
- **Animations**: Framer Motion
- **Theme**: next-themes (dark default, toggleable)

### Project Structure

```
src/
├── app/[locale]/          # Locale-based routing (en, ru)
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main portfolio page
├── components/            # React components
├── data/projects.ts       # Project data and contacts
├── i18n/                  # Internationalization config
│   ├── config.ts          # Locales definition
│   ├── navigation.ts      # Localized Link/router
│   ├── request.ts         # Message loading
│   └── routing.ts         # Routing config
└── middleware.ts          # Locale detection middleware
messages/                  # Translation files (en.json, ru.json)
```

### Key Patterns

- **Locale routing**: All pages under `[locale]/`. Middleware auto-redirects based on browser language.
- **Translations**: Use `useTranslations()` hook. Project data translations in `projectData` key.
- **Theme colors**: CSS variables in `globals.css`. Use semantic names: `bg-card`, `text-muted-foreground`, `border-border`.
- **Project cards**: Data in `src/data/projects.ts`. Each project has `demoUrl` pointing to subdomain with guest access.

### Adding a New Project

1. Add entry to `src/data/projects.ts`
2. Add translations to both `messages/en.json` and `messages/ru.json` under `projectData`
