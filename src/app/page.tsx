import type { CSSProperties, ReactNode } from 'react';

import { ArrowUpRight } from '@/components/arrow-up-right';
import { Scroller } from '@/components/scroller';
import { Year } from '@/components/year';
import {
  CONNECT,
  type Entry,
  FOOTER_LINE,
  INTRO,
  NOW,
  PROJECTS,
  SITE_NAME,
  WORK,
} from '@/content/home';
import { EXTERNAL } from '@/content/profile';
import { STRUCTURED_DATA } from '@/lib/structured-data';

const PAGE = 'mx-auto w-full max-w-page px-6';

const PROSE = 'flex flex-col gap-7';

const HEADING = 'font-display font-medium text-copy';

const stagger = (step: number) => ({ '--stagger': step }) as CSSProperties;

function Column({ title, entries }: { title: string; entries: Entry[] }) {
  const id = `${title.toLowerCase()}-title`;

  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-small text-dim">
        {title}
      </h2>
      <ul className="mt-5 flex flex-col gap-6">
        {entries.map(({ title, description, href }) => (
          <li key={title}>
            <a href={href} {...EXTERNAL} className="group inline-flex items-center gap-1 text-ink">
              {title}
              <ArrowUpRight
                size={14}
                className="text-faint transition duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-dim motion-reduce:transition-none"
              />
            </a>
            <p className="text-dim">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Block({ title, step, children }: { title: string; step: number; children: ReactNode }) {
  const id = `${title.toLowerCase()}-title`;

  return (
    <section aria-labelledby={id} className={`enter ${PROSE}`} style={stagger(step)}>
      <h2 id={id} className={HEADING}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD with `<` escaped.
        dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-0 z-10 -mb-16 h-16 opacity-95 backdrop-blur-[5px] [mask-image:linear-gradient(to_bottom,black_25%,transparent)] after:absolute after:inset-0 after:bg-linear-to-b after:from-page after:to-transparent md:-mb-24 md:h-24"
      />
      <main className="py-16 md:py-32">
        <div className={`${PAGE} ${PROSE}`}>
          <h1 className={`enter ${HEADING} text-[17px]/7`}>{SITE_NAME}</h1>
          <div className={`enter ${PROSE}`} style={stagger(1)}>
            {INTRO}
          </div>
        </div>

        <div className="mt-16 bg-band">
          <div className={`${PAGE} enter py-12 wide:py-14`} style={stagger(3)}>
            <Scroller>
              <Column title="Work" entries={WORK} />
              <Column title="Projects" entries={PROJECTS} />
            </Scroller>
          </div>
        </div>

        <div className={`${PAGE} mt-14 flex flex-col gap-15 wide:mt-16`}>
          <Block title="Now" step={5}>
            {NOW}
          </Block>
          <Block title="Connect" step={6}>
            {CONNECT}
          </Block>
        </div>
      </main>
      <footer className="border-t border-line">
        <div
          className={`${PAGE} flex min-h-12 items-center justify-between gap-6 py-3 text-small text-faint`}
        >
          <p>{FOOTER_LINE}</p>
          <Year />
        </div>
      </footer>
    </>
  );
}
