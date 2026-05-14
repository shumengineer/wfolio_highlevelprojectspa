# Engineer's Technical Journal Engine

A high-performance, minimalist technical communication engine designed for software engineers to document complex architectural challenges and technical narratives. Built with a focus on performance, security, and immersive editorial experiences.

## Technical Architecture

This project is built using a modern, senior-level engineering stack:

- **Framework**: React with Vite for rapid development and optimized builds.
- **Routing**: [TanStack Router](https://tanstack.com/router) for type-safe, file-based routing and advanced loader patterns.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for sophisticated scroll-linked interactions and architectural visualizations.
- **State Management**: Focused on localized state and router-driven data flow to minimize re-renders.
- **Styling**: Modern CSS with utility-first principles, focusing on high-end aesthetics (glassmorphism, subtle micro-animations).

## Key Engineering Features

### 1. Immersive Case Study System
Modular route architecture that allows for deep-dive technical narratives. Each section can include:
- **Interactive Visualizations**: Lazy-loaded, animated SVG diagrams (Architecture, DevOps, Database Schemas, Migration flows).
- **Code Fragment Carousels**: Scroll-locked horizontal galleries for technical reference material.
- **Granular Filtering**: Real-time technical focus selection (QA, Full-stack, DevOps) to filter narrative sections.

### 2. High-Security Communication Patterns
- **Bot-Resistant Email Obfuscation**: The contact logic defers mounting until client-side execution and uses hidden DOM "mesh" elements to prevent harvesting by static scraping bots.
- **Click-to-Copy Pipeline**: Replaced standard `mailto:` links with a native Clipboard API implementation for better UX and security.

### 3. Advanced Scroll-Linked Interactions
- **Horizontal Scroll Lock**: A mathematically precise horizontal scroll section for secondary project listings. It uses `useLayoutEffect` and `useTransform` to synchronize 1:1 vertical-to-horizontal travel, ensuring content is fully viewed before release.
- **Scroll Reveal Blocks**: Staggered entry animations that maintain low CPU overhead by leveraging hardware-accelerated transforms.

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- pnpm (Recommended package manager)

### Development
```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev
```

### Production Build
```bash
# Generate optimized production bundle
pnpm build

# Run linting/formatting checks
pnpm lint
```

## Security & Privacy
This engine is designed to be search-neutral. It avoids standard SEO patterns that prioritize common discovery keywords, focusing instead on direct link-sharing and professional technical presentation.

## License
MIT
