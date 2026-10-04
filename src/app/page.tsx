import type { ReactNode } from 'react';

import { ArrowUpRight } from '@/components/arrow-up-right';
import { CopyMail } from '@/components/copy-mail';
import { Clock, Today } from '@/components/ist-time';
import { ABOUT, BASED_IN, FOOTER_LINE, PROJECTS, SITE_NAME, TAGLINE, WORK } from '@/content/home';
import { LINKS, MAIL } from '@/content/profile';
import { STRUCTURED_DATA } from '@/lib/structured-data';

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const;

const COLUMN = 'mx-auto max-w-column px-6';

const PILL =
  'inline-flex h-11 items-center rounded-full border px-[22px] font-sans text-button font-medium transition-colors duration-200 ease-out motion-reduce:transition-none';

function Section({
  id,
  title,
  band = false,
  children,
}: {
  id: string;
  title: string;
  band?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={band ? 'bg-band' : undefined}>
      <div className={`${COLUMN} py-18 wide:py-22`}>
        <h2 id={`${id}-title`} className="text-eyebrow font-medium uppercase text-muted">
          {title}
        </h2>
        <div className="mt-5 wide:mt-7">{children}</div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <header className="border-b border-line">
      <div className={`${COLUMN} pt-24 pb-20 wide:pt-36 wide:pb-24`}>
        <h1 className="font-display text-hero font-normal">{SITE_NAME}</h1>
        <p className="mt-5 max-w-[34rem] text-tagline text-balance text-copy">{TAGLINE}</p>

        <p className="mt-5 text-meta tracking-[0.01em] text-muted tabular-nums">
          <span className="sr-only">Based in </span>
          {BASED_IN}
          <span aria-hidden="true" className="mx-2 text-faint">
            ·
          </span>
          <span className="sr-only">, local time </span>
          <Clock /> IST
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${MAIL}`}
            className={`${PILL} border-ink bg-ink text-page hover:border-white hover:bg-white hover:text-page`}
          >
            Mail me
          </a>
          <CopyMail className={`${PILL} border-edge text-copy hover:border-muted hover:text-ink`} />
          <a
            href={LINKS.resume}
            {...EXTERNAL}
            className="group ml-1 inline-flex items-center gap-1 text-button font-medium text-copy hover:text-ink wide:ml-2.5"
          >
            Résumé
            <ArrowUpRight
              size={12}
              className="text-faint transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-ink motion-reduce:transition-none"
            />
          </a>
        </div>
      </div>
    </header>
  );
}

function Projects() {
  return (
    <ul className="grid gap-x-10 gap-y-8 md:grid-cols-3">
      {PROJECTS.map(({ title, description, href }) => (
        <li key={title}>
          <h3 className="font-display font-title text-title">
            <a
              href={href}
              {...EXTERNAL}
              className="group inline-flex items-center gap-1.5 text-ink hover:text-ink"
            >
              {title}
              <ArrowUpRight
                size={14}
                className="text-faint transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent motion-reduce:transition-none"
              />
            </a>
          </h3>
          <p className="mt-2 text-muted">{description}</p>
        </li>
      ))}
    </ul>
  );
}

function Work() {
  return (
    <ol className="flex flex-col gap-9">
      {WORK.map(({ label, title, description, href }) => (
        <li
          key={title}
          className="flex flex-col gap-1 wide:flex-row wide:items-baseline wide:gap-8"
        >
          <p className="shrink-0 font-mono text-label font-medium text-muted wide:w-32">{label}</p>
          <div>
            <h3 className="font-display font-title text-title">
              <a
                href={href}
                {...EXTERNAL}
                className="text-ink underline decoration-ink/30 decoration-1 underline-offset-[0.2em] hover:text-ink hover:decoration-ink"
              >
                {title}
              </a>
            </h3>
            <p className="mt-1.5 text-muted">{description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div
        className={`${COLUMN} flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5 text-foot text-muted`}
      >
        <p>{FOOTER_LINE}</p>
        <Today />
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD, `<` escaped at the source.
        dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
      />
      <Hero />
      <main>
        <Section id="about" title="About">
          <div className="prose-links flex max-w-measure flex-col gap-[1.125rem] text-lead text-copy">
            {ABOUT}
          </div>
        </Section>
        <Section id="work" title="Work" band>
          <Work />
        </Section>
        <Section id="projects" title="Projects">
          <Projects />
        </Section>
      </main>
      <Footer />
    </>
  );
}
