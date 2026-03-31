# CLAUDE.md — FilmmAiker Studio Web

This file provides context and conventions for AI assistants working on this codebase.

## Project Overview

FilmmAiker Studio is a luxury creative agency landing page — a frontend-only React/TypeScript SPA featuring cinematic scroll-based animations, dark/light theming, and AI-driven visual storytelling aesthetics.

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript 5.8 |
| Build | Vite 6 |
| Animations | Framer Motion 12 |
| Styling | Tailwind CSS (CDN) |
| Fonts | Google Fonts — Inter |

> Tailwind is loaded via CDN in `index.html`, not installed as an npm package. Do not attempt to install or configure it as a PostCSS plugin.

## Repository Structure

```
/
├── index.html                  # HTML entry — CDN imports, custom scrollbar styles
├── index.tsx                   # React entry point (mounts to #root)
├── App.tsx                     # Root component — theme state, full page layout
├── types.ts                    # Shared TypeScript interfaces (FrameData, SectionContent)
├── vite.config.ts              # Vite config — port 3000, GEMINI_API_KEY injection
├── tsconfig.json               # TypeScript config — ESNext, bundler resolution
├── metadata.json               # App name/description metadata
├── package.json
└── components/
    ├── ScrollytellingCanvas.tsx # Scroll-linked canvas frame animation (120 frames)
    ├── Navbar.tsx               # Fixed nav — logo, theme toggle, links
    ├── InfoSection.tsx          # Stats grid with animated reveals
    ├── PricingSection.tsx       # Two-tier pricing display
    ├── ContactFormSection.tsx   # Contact form (frontend only, no submission)
    └── Footer.tsx               # Logo, social links, contact info
```

## Development Workflow

### Setup

```bash
npm install
# Create .env.local and add:
# GEMINI_API_KEY=<your-key>
npm run dev      # Starts dev server at http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Vite dev server (port 3000, 0.0.0.0)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

No test runner, linter, or formatter is configured. There is no `npm test` or `npm run lint` command.

### Environment Variables

Vite exposes the following at build time via `vite.config.ts`:

- `GEMINI_API_KEY` — loaded from `.env.local` and injected as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY`

## Code Conventions

### Component Structure

- All components are functional React components typed with `React.FC`
- Props interfaces are named `<ComponentName>Props` and defined inline or above the component
- Components use default exports
- File names match component names exactly (PascalCase)

### Theme System

`App.tsx` owns `isDark` state and passes it down as a prop. Components accept `isDark: boolean` and `onToggleTheme?: () => void` props.

- Dark background: `#050505`
- Light background: `#f4f5f5`
- Accent color: `#a4e37d` (lime green)

When adding new components, follow this pattern — do not introduce a React context or separate theme provider unless explicitly asked.

### Styling

- Use Tailwind CSS utility classes inline in JSX
- Use conditional classes for theme variants: `isDark ? 'text-white' : 'text-black'`
- Use opacity modifiers for subtle colors: `white/40`, `black/50`
- Do not create separate `.css` files unless absolutely necessary

### Animation Patterns

Framer Motion is used throughout. Common patterns:

```tsx
// Scroll-based animation
const { scrollYProgress } = useScroll({ target: ref })
const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

// Spring-smoothed scroll value
const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })

// Viewport-triggered reveal
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: i * 0.1 }}
/>
```

Custom easing: `[0.215, 0.61, 0.355, 1]`

### Naming Conventions

- Components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE` (e.g., `TOTAL_FRAMES = 120`)
- Variables/functions: `camelCase`
- TypeScript interfaces: `PascalCase`

### TypeScript

- Avoid `any` — use explicit types or `unknown`
- Use interfaces for object shapes passed as props
- `tsconfig.json` has `noEmit: true` — TypeScript is for type-checking only, Vite handles compilation

## Key Implementation Details

### ScrollytellingCanvas

- Loads 120 JPEG frames from Apple's AirPods Pro CDN sequence
- Renders frames on an HTML `<canvas>` synchronized to `scrollY`
- Has a loading progress bar (0→100%) before playback starts
- Contains `CharReveal` sub-component for staggered character animations
- Canvas is sized with `devicePixelRatio` awareness for sharp display

### External Assets

The app loads images from external URLs:
- Frame sequence: `https://www.apple.com/105/media/us/airpods-pro/...`
- Placeholder images: `https://picsum.photos/...`
- Grainy texture: `https://grainy-gradients.vercel.app/noise.svg`

Do not inline or bundle these. They are intentional external references.

### Contact Form

The contact form in `ContactFormSection.tsx` calls `e.preventDefault()` and does not submit data anywhere. It is a UI-only demo. If wiring up a backend, add a submission handler there.

## Git Conventions

### Branch Naming

- Feature branches: `claude/description-shortId` (e.g., `claude/add-claude-documentation-k8Foa`)
- Production: `main`

### Commit Style

Use conventional commits:

```
feat: add hero section animation
fix: correct canvas frame index calculation
refactor: extract theme toggle into hook
docs: update CLAUDE.md
```

Commits are GPG-signed via SSH key (configured in local git config — do not modify).

### Workflow

1. Always develop on the designated feature branch
2. Commit with descriptive messages
3. Push with `git push -u origin <branch-name>`
4. Do not push directly to `main`

## What This Project Is NOT

- No backend, no API routes, no database
- No SSR (not Next.js — this is plain Vite/React)
- No CSS modules, no styled-components, no Sass
- No testing framework
- No CI/CD pipelines
- No Docker

## Common Pitfalls

- **Do not install Tailwind as a package** — it is loaded from CDN
- **Do not add a test script** unless setting up a full test suite (Vitest recommended if needed)
- **Do not create `.env`** without `.local` suffix for secrets — `.env.local` is gitignored
- **Do not import React** at the top of files — the project uses the automatic JSX runtime (`react-jsx`)
- **Preserve the CDN import map** in `index.html` — React and Framer Motion are loaded from `esm.sh` for the browser, while Vite handles the dev/build pipeline separately
