# Ketan Thakur — Portfolio

A bold, motion-driven personal portfolio. Built with React 19, TypeScript, and Vite, with a brutalist-playful aesthetic — condensed display type, an orange/black palette, a custom cursor, ambient audio, and animated section reveals.

🌐 **Live:** [ketanthakur.me](https://ketanthakur.me)

---

## Tech Stack

| Layer       | Choice                          |
| ----------- | ------------------------------- |
| Framework   | React 19                        |
| Language    | TypeScript                      |
| Build tool  | Vite 7                          |
| Animation   | Framer Motion + GSAP            |
| Forms       | [Web3Forms](https://web3forms.com) (serverless email) |
| Hosting     | GitHub Pages (custom domain)    |
| CI/CD       | GitHub Actions                  |

---

## Features

- **Intro preloader** — animated percentage counter with a name-zoom reveal.
- **Custom cursor** — replaces the native pointer site-wide.
- **Ambient audio** — toggleable background loop plus synthesized UI tick FX (Web Audio, no sound files needed). Respects `prefers-reduced-motion`.
- **Scroll-reveal sections** — Hero, About, Experience, Tech Stack, Projects, Gallery, Testimonials.
- **Contact form** — sends real email via Web3Forms; cursor-tracking mascot, success toast that auto-dismisses in 3s, and graceful error states.
- **Accessibility** — reduced-motion fallbacks and ARIA live regions on form status.

---

## Getting Started

```bash
# install
npm install

# dev server (http://localhost:5173)
npm run dev

# production build
npm run build

# preview the build
npm run preview

# lint
npm run lint
```

### Environment

The contact form uses Web3Forms. Copy the example env and add your access key (free at [web3forms.com](https://web3forms.com)):

```bash
cp .env.example .env
```

```env
VITE_WEB3FORMS_KEY=your-access-key-here
```

> The Web3Forms access key is sent from the browser by design, so it is **not a secret** — it is safe in the client bundle. For deploys, the same value is provided to the build via the GitHub Actions secret `VITE_WEB3FORMS_KEY`.

---

## Project Structure

```
src/
├── App.tsx               # composes all sections
└── components/
    ├── Intro/            # preloader + name-zoom reveal
    ├── Header/           # nav
    ├── Hero/             # landing
    ├── Marquee/          # scrolling banner
    ├── About/
    ├── Experience/
    ├── TechStack/
    ├── Projects/
    ├── Gallery/
    ├── Testimonials/
    ├── Contact/          # mascot + Web3Forms form + success toast
    ├── Footer/
    ├── Cursor/           # custom cursor
    ├── AudioControl/     # ambient audio + UI FX
    └── ScrollReveal/     # scroll-triggered animation helper
```

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys `dist/` to GitHub Pages. The custom domain (`ketanthakur.me`) is configured via the `CNAME` file.

To deploy with a working contact form, add the access key as a repository secret:

> **Settings → Secrets and variables → Actions → New repository secret**
> Name: `VITE_WEB3FORMS_KEY` · Value: your Web3Forms key

---

## License

Personal project — all rights reserved. Feel free to draw inspiration, but please don't clone it wholesale.
