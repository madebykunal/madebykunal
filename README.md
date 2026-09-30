# Kunal Singh

**Product designer and engineer.** Designer at heart and curious by habit. Happiest with a good book, a good album, and a problem worth untangling.

📍 India (IST, UTC+5:30)

---

## About me

I was a designer before I wrote much code. I joined [Calxmap](https://calxmap.com) as a design intern and learned the job the slow way, through documentation, research and relentless iteration, until I was leading design for the company.

These days I split my time between design and the frontend, working with the engineering team to turn designs into production code in React and Next.js.

Next is **Rust**. I'm learning it to build fast, reliable backends, so a product can go from a design file to a server without being handed off in between.

Offline, I keep myself grounded with books and music.

## Work

| Product | What it is |
| --- | --- |
| [**Calxmap**](https://calxmap.com) | The expert marketplace platform. Book any expert, anytime and anywhere. I started here as a design intern and now lead design, while working with the engineering team on the frontend. |
| [**Calxbook**](https://calxbook.com) | Learn live from verified experts. Master any skill with the expert of your choice, in live sessions. Designed and built alongside the same team. |

## Projects

- **[PlayZ](https://playz.pages.dev)**: a browser arcade of a dozen quick games, from Snake and Tetris to Sudoku and a retro chess board, built with plain HTML, CSS and JavaScript.
- **[Plus Compiler](https://github.com/madebykunal/Plus-Compiler)**: a minimal code playground for HTML, CSS, JS, C and Rust. Next.js and Monaco in front, Rust and Axum behind.
- **[Noteiler](https://github.com/madebykunal/Noteiler)**: a calm, distraction-free writing editor for getting words down without the noise.

## Say hello

- ✉️ [madebykunal@gmail.com](mailto:madebykunal@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/madebykunal)
- 🐙 [GitHub](https://github.com/madebykunal)

---

## About this repository

This is the source of my personal website: a single, dark, text-first page inspired by [ladybird.org](https://ladybird.org).

**Built with:** [Next.js 16](https://nextjs.org) (App Router) · [React 19](https://react.dev) · [TypeScript 7](https://www.typescriptlang.org) · [Tailwind CSS 4](https://tailwindcss.com) · [Biome](https://biomejs.dev) · [Vercel Analytics](https://vercel.com/analytics)

**A few details I care about:**

- Statically prerendered, with the CSS inlined, so the page paints without waiting on a stylesheet.
- No icon or UI libraries. The only runtime dependencies are Next.js, React and Vercel Analytics.
- Responsive from 320px phones to wide desktops, with visible focus states and screen-reader-friendly labels.
- Strict security headers (CSP, HSTS, COOP, Referrer and Permissions policies).
- Small touches: a live IST clock, a one-click "Copy email" button, a crosshair cursor, and a 1px scrollbar that hides when you stop scrolling.

### Run it locally

```bash
git clone https://github.com/madebykunal/madebykunal.git
cd madebykunal
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Check with Biome |
| `npm run format` | Fix formatting with Biome |
| `npm run typecheck` | Type-check with TypeScript |

All page copy lives in `src/content/home.tsx`, and design tokens are in `src/app/globals.css`.

---

<sub>Good things happen once, others are created.</sub>
