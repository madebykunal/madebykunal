import type { ReactNode } from 'react';

import { ArrowUpRight } from '@/components/arrow-up-right';
import { CopyMail } from '@/components/copy-mail';
import { Clock, Today } from '@/components/ist-time';
import { ABOUT, BASED_IN, FOOTER_LINE, PROJECTS, SITE_NAME, TAGLINE, WORK } from '@/content/home';
import { MAIL } from '@/content/profile';

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const;

const COLUMN = 'mx-auto max-w-column px-6';

const PILL =
  'inline-flex h-12 items-center rounded-full border-2 px-6 font-mono text-button font-semibold transition-colors duration-200 ease-out motion-reduce:transition-none';

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
      <div className={`${COLUMN} py-20 wide:py-24`}>
        <h2 id={`${id}-title`} className="font-title text-heading">
          {title}
        </h2>
        <div className="mt-6 wide:mt-8">{children}</div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <header className="border-b border-line">
      <div className={`${COLUMN} pt-24 pb-20 wide:pt-36 wide:pb-24`}>
        <h1 className="text-hero font-light">{SITE_NAME}</h1>
        <p className="mt-6 max-w-[36rem] text-lead text-pretty text-muted">{TAGLINE}</p>

        <dl className="mt-8 flex flex-col gap-1 text-meta">
          <div>
            <dt className="inline font-medium">Based in:</dt>{' '}
            <dd className="inline text-muted">{BASED_IN}</dd>
          </div>
          <div>
            <dt className="inline font-medium">Local time:</dt>{' '}
            <dd className="inline text-muted tabular-nums">
              <Clock /> IST
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${MAIL}`}
            className={`${PILL} border-muted text-ink hover:border-ink hover:text-ink`}
          >
            Mail me
          </a>
          <CopyMail
            className={`${PILL} border-edge text-muted hover:border-muted hover:text-ink`}
          />
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
          <h3 className="font-title text-title">
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
    <ol className="flex flex-col gap-8">
      {WORK.map(({ label, title, description, href }) => (
        <li
          key={title}
          className="flex flex-col gap-1 wide:flex-row wide:items-baseline wide:gap-8"
        >
          <p className="shrink-0 font-mono text-label font-semibold text-muted wide:w-32">
            {label}
          </p>
          <div>
            <h3 className="font-title text-title">
              <a
                href={href}
                {...EXTERNAL}
                className="text-ink underline decoration-ink/35 decoration-1 underline-offset-[0.25em] hover:text-ink hover:decoration-ink"
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
      <Hero />
      <main>
        <Section id="about" title="About">
          <div className="prose-links flex flex-col gap-5 text-lead text-muted">{ABOUT}</div>
        </Section>
        <Section id="projects" title="Projects" band>
          <Projects />
        </Section>
        <Section id="work" title="Work">
          <Work />
        </Section>
      </main>
      <Footer />
    </>
  );
}
