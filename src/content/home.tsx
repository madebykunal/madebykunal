import type { ReactNode } from 'react';

import { LINKS } from '@/content/profile';

export const SITE_NAME = 'Kunal Singh';

export const TAGLINE =
  'Designer at heart. I build the frontend in React, and I’m learning Rust for the rest.';

export const BASED_IN = 'India';

export type Entry = {
  title: string;
  description: string;
  href: string;
  label?: string;
};

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const;

export const ABOUT: ReactNode = (
  <>
    <p>
      I was a designer before I wrote much code. I joined{' '}
      <a href={LINKS.calxmap} {...EXTERNAL}>
        Calxmap
      </a>{' '}
      as a design intern and learned the job the slow way, through research and relentless
      iteration, until I was leading its design.
    </p>
    <p>
      Today I split my time between design and the frontend, turning designs into production code in
      React and Next.js. Next is Rust, so a product can go from a design file to a server without a
      handoff in between.
    </p>
    <p>
      Offline, I keep myself grounded with books and music. You can also find me on{' '}
      <a href={LINKS.linkedin} {...EXTERNAL}>
        LinkedIn
      </a>{' '}
      and{' '}
      <a href={LINKS.github} {...EXTERNAL}>
        GitHub
      </a>
      , or read my{' '}
      <a href={LINKS.resume} {...EXTERNAL}>
        résumé
      </a>
      .
    </p>
  </>
);

export const PROJECTS: Entry[] = [
  {
    title: 'Plus Compiler',
    description:
      'A code playground for HTML, CSS, JS, C and Rust. Next.js in front, Rust and Axum behind.',
    href: 'https://github.com/madebykunal/Plus-Compiler',
  },
  {
    title: 'Noteiler',
    description: 'A calm, distraction-free editor for getting words down without the noise.',
    href: 'https://github.com/madebykunal/Noteiler',
  },
  {
    title: 'PlayZ',
    description: 'A dozen quick browser games, from Snake to chess, in plain HTML, CSS and JS.',
    href: 'https://playz.pages.dev',
  },
];

export const WORK: Entry[] = [
  {
    label: 'calxmap.com',
    title: 'Calxmap — the expert marketplace platform',
    description: 'Book any expert, anytime and anywhere. I lead design and work on the frontend.',
    href: LINKS.calxmap,
  },
  {
    label: 'calxbook.com',
    title: 'Calxbook — learn live from verified experts',
    description: 'Designed by me, built alongside the same team.',
    href: 'https://calxbook.com',
  },
];

export const FOOTER_LINE = 'Good things happen once, others are created.';
