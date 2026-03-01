# Magnifico — Team Projects Landing Page

A responsive marketing landing page for **Magnifico** — a team project management platform.

**[→ Live Demo](https://goldenspade.github.io/landing_magnifico_tools/)**

## Live Preview

**[https://goldenspade.github.io/landing_magnifico_tools/](https://goldenspade.github.io/landing_magnifico_tools/)**

> Or run locally: start a dev server with `npm run dev`, or open `dist/index.html` after `npm run build`.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Vite](https://vitejs.dev/) | ^6.4 | Build tool & dev server |
| [Sass](https://sass-lang.com/) | ^1.97 | CSS preprocessor |
| [Lenis](https://lenis.darkroom.engineering/) | ^1.x | Smooth scroll |
| Vanilla JS | ES2020+ | Interactive behaviour |

No frameworks, no UI libraries — just HTML, SCSS, and JavaScript (plus Lenis for smooth scrolling).

---

## Project Structure

```
landing_magnifico_tools/
├── src/
│   ├── index.html              # Entry point
│   ├── images/
│   │   ├── hero/               # Hero section images
│   │   ├── enjoy/              # Enjoy section images
│   │   ├── tools/              # Tools section images
│   │   ├── problems/           # Problems section images
│   │   └── workflow/           # Workflow section images
│   ├── scripts/
│   │   ├── main.js             # Entry JS — imports modules
│   │   ├── nav-mobile.js       # Mobile nav & burger logic
│   │   ├── workflow-tabs.js    # Tab switcher with fade animation
│   │   ├── back-to-top.js      # Back-to-top button logic
│   │   └── modal.js            # Login & Sign Up modal logic
│   └── styles/
│       ├── main.scss           # Root — imports all blocks
│       ├── _reset.scss         # CSS reset + custom scrollbar
│       ├── utils/
│       │   └── _vars.scss      # Design tokens (colors, fonts, spacing)
│       └── blocks/             # One file per section (BEM)
│           ├── container.scss
│           ├── header.scss
│           ├── hero.scss
│           ├── enjoy.scss
│           ├── tools.scss
│           ├── problems.scss
│           ├── workflow.scss
│           ├── cta.scss
│           ├── footer.scss
│           ├── back-to-top.scss
│           └── modal.scss
├── vite.config.js
└── package.json
```

---

## Page Sections

| Section | Description |
|---------|-------------|
| **Header / Nav** | Sticky navigation with logo, desktop dropdowns on hover, mobile burger menu |
| **Hero** | Two-column layout with headline, email sign-up form, partner logos, and a browser mockup |
| **Enjoy** | Feature highlight — image left, text right |
| **Tools** | Feature highlight — text left, chart image right |
| **Problems** | Full-width banner with background image and overlay |
| **Workflow** | Interactive tab switcher (Research / Plan / Design) with browser mockup |
| **CTA** | Gradient call-to-action banner |
| **Footer** | Copyright and navigation links |

---

## Features

### Navigation
- **Desktop dropdowns** — revealed on hover with CSS `opacity` + `visibility` transition; chevron rotates 180° on open
- **Mobile burger menu** — slides in with `nav-mobile--open` class; closes on outside click, on link click, or when resizing above 925 px
- **Accordion sub-menus** — mobile nav items expand/collapse on click with `max-height` transition; only one section open at a time

### Auth Modals
- **Log In & Sign Up modals** — open on clicking any corresponding button across the page (nav, hero, CTA); appear with a fade + slide-up animation over a blurred backdrop
- **Client-side validation** — required fields, email format check, password minimum length; errors appear inline under each field and clear as the user types
- **Success screen** — after a valid form submit the form is replaced with a confirmation message inside the modal
- **Switch between modals** — inline link to swap between Log In and Sign Up without closing
- **Accessible close** — × button, click on backdrop, or Escape key; page scroll is locked while the modal is open (via `lenis.stop()`)

### Smooth Scroll & UX
- **Lenis** — lightweight smooth scroll library; provides natural momentum scrolling across the entire page
- **Back-to-top button** — appears after scrolling 400 px, uses Lenis to animate the return to top; fades in/out with a CSS transform transition

### Workflow Tabs
- Three tabs: Research, Plan, Design
- Tab content switches with a **fade out → swap text → fade in** animation using CSS `opacity` transition and a `setTimeout`

### Responsive Design
- Breakpoints: **925 px** (tablet/mobile) and **576 px** (small mobile)
- Mobile-first friendly layout — all sections reflow to single column below 925 px
- Navigation fully adapts — desktop dropdowns hidden, burger menu shown

### CSS Architecture
- **BEM** methodology for all class names
- **SCSS modules** via `@use` — each block isolated in its own file
- **Design tokens** centralised in `_vars.scss` (colors, typography, spacing, transitions)
- CSS reset included to ensure consistent cross-browser baseline

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Design Decisions

- **No JavaScript frameworks** — the interactivity (mobile nav, tab switching) is simple enough to handle cleanly in vanilla JS, keeping the bundle minimal
- **CSS-only desktop dropdowns** — `:hover` on the parent `<li>` triggers visibility; the absolutely positioned panel remains inside the element, so hovering the dropdown itself keeps the parent `:hover` active
- **Stylesheet in `<head>` via `<link>`** — instead of importing CSS through the JS module (which is always deferred), the stylesheet is linked directly in HTML so it loads synchronously, preventing any flash of unstyled content on first render

---

## Demo

[https://goldenspade.github.io/landing_magnifico_tools/](https://goldenspade.github.io/landing_magnifico_tools/)
