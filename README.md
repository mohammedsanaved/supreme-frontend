<!-- ````markdown -->

# Supreme Group Frontend

**Technical Task for Frontend Developer Position (Blacksof)**

> _“Implement the Supreme Group website frontend using modern best practices and the specified tech stack.”_

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack & Justification](#tech-stack--justification)
- [Getting Started](#getting-started)
- [Component Architecture](#component-architecture)
- [Design Adherence & Styling](#design-adherence--styling)
- [Responsive Design Strategy](#responsive-design-strategy)
- [Performance Optimization](#performance-optimization)
- [Accessibility Considerations](#accessibility-considerations)
- [Animations](#animations)
- [Testing](#testing)
- [Third-Party Libraries](#third-party-libraries)
- [Assumptions & Decisions](#assumptions--decisions)
- [Challenges & Solutions](#challenges--solutions)
- [Future Improvements](#future-improvements)
- [Deployment](#deployment)
- [Submission](#submission)
- [Assets & References](#assets--references)

---

## Project Overview

- **Goal**: Build a performant, maintainable, pixel-perfect frontend for the [Supreme Group](https://supreme-group.vercel.app/) site based on a Figma design.
- **Scope**: Hero, About, Solutions, Projects, Contact, Footer, and interactive “360-degree solutions” section with scroll-driven animations and video panels.
- **Timeline**: Complete by **08 June, EOD**.

---

## Tech Stack & Justification

| Layer            | Technology                  | Rationale                                                                  |
| ---------------- | --------------------------- | -------------------------------------------------------------------------- |
| Framework        | Next.js (Webpack)           | SSR/SSG, image optimization, routing, performance features out-of-the-box. |
| Language         | TypeScript                  | Static typing, IDE autocompletion, safer refactoring.                      |
| Styling          | Tailwind CSS                | Utility-first for rapid, consistent styling and responsive design.         |
| Build Tool       | Next.js default (Webpack)   | Native integration with Next.js features; minimal custom config.           |
| State Management | React Context + local state | Site is largely static; minimal global state needed.                       |
| Animations       | Framer Motion               | Declarative, performant scroll & in-view animations.                       |

---

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/supreme-frontend.git
   cd supreme-frontend
   ```

````

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

4. **Build for production**

   ```bash
   npm run build && npm start
   ```

---

## Component Architecture

- **`app/layout.tsx`** & **`globals.css`** — root layout, font + Tailwind imports
- **`app/page.tsx`** — composes sections
- **`components/`**

  - `HeroSection.tsx`
  - `AboutSection.tsx`
  - `SolutionsSection.tsx`
  - `ProjectsSection.tsx`
  - `SolutionSection.tsx` (scroll-driven 360° animations)
  - `ContactSection.tsx` (Formik form + custom toast)
  - `Footer.tsx`
  - `ui/` — reusable cards, buttons, navbar, etc.

- **`public/`** — images, videos, icons

---

## Design Adherence & Styling

- **Figma accuracy**: exact colors, fonts, spacing, and assets.
- **Tailwind theme** extension for brand palette and custom spacing tokens.
- **Utility classes** to enforce pixel-perfect margins, typography, and layout.

---

## Responsive Design Strategy

- **Mobile-first**: default styles target mobile, overrides via `sm:`, `md:`, `lg:`, `xl:` breakpoints.
- **Layout patterns**:

  - Hero: full-screen, text centered.
  - Two-column sections: `flex-col` → `md:flex-row`.
  - Grids: `grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-3`.

- **Testing**: Chrome DevTools at 320px, 480px, 768px, 1024px, 1440px.

---

## Performance Optimization

- **Next.js `<Image>`** for auto-optimized responsive images.
- **Dynamic imports** (`next/dynamic`) for non-critical components.
- **CSS Purging** via `tailwind.config.js` content paths.
- **Bundle analysis**: `ANALYZE=true npm run build`.

---

## Accessibility Considerations

- **Semantic HTML**: `<header>`, `<main>`, `<section>`, `<footer>`.
- **ARIA**: roles on custom controls, `aria-live` for error messages.
- **Keyboard**: all interactive elements focusable, visible `focus:ring`.
- **Contrast**: 4.5:1 for normal text, 3:1 for large text.
- **Reduced motion**: respect `prefers-reduced-motion` in Framer Motion.

---

## Animations

- **Framer Motion** for scroll-driven transforms (`useScroll`, `useTransform`).
- **In-view reveals** (`useInView` + `useAnimation`).
- **Spring transitions** for natural movement.

---

## Testing

> _Optional but recommended_

- **Unit/Integration** with **Jest** & **React Testing Library**.
- **E2E** with **Cypress** for critical flows (scroll animations, form submission).

---

## Third-Party Libraries

- **next/font** — font optimization
- **Formik & Yup** — form state + validation
- **clsx** — conditional classNames
- **lucide-react** — SVG icons
- **SWR** _(future)_ — data fetching
- **next-seo** _(future)_ — metadata

---

## Assumptions & Decisions

- **No global state lib** due to static content.
- **Next.js (Webpack)** chosen over Vite for built-in SSR/ISR & image optimization.
- **Tailwind** over CSS-in-JS for faster iteration and smaller stylesheet.

---

## Challenges & Solutions

| Challenge                             | Solution                                                       |
| ------------------------------------- | -------------------------------------------------------------- |
| Tailwind spacing ≠ Figma pixel values | Extended `tailwind.config.js` with custom spacing tokens.      |
| Sticky navbar overlap on anchors      | Added section padding + negative margin (`pt-16 -mt-16`).      |
| Video reload on control click         | Used `videoRef.current.load()` then `play()` in click handler. |

---

## Future Improvements

- Dark mode toggle (`dark:` classes).
- Internationalization (Next.js i18n).
- CMS integration (Sanity, Contentful).
- PWA support (`next-pwa`).
- Analytics & A/B testing.
- Contact form backend (serverless function).

---

## Deployment

- **GitHub Repo**: `https://github.com/your-username/supreme-frontend`
- **Live Demo**: `https://supreme-frontend.vercel.app`

---

## Submission

> Reply to the assignment email with:

1. **GitHub repository link**
2. **Deployed URL**

---

## Assets & References

- **Figma Design**: _\[provided URL]_
- **Demo Site**: [https://supreme-group.vercel.app/](https://supreme-group.vercel.app/)

---

**Evaluation Criteria**

- Functionality & correctness (15%)
- Code quality & organization (15%)
- Design adherence (25%)
- Responsiveness (25%)
- Performance (5%)
- Accessibility (5%)
- Documentation (5%)
- Best practices (5%)
````
