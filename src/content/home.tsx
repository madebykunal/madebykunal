import type { ReactNode } from 'react';

import { LINKS } from '@/content/profile';

export const SITE_NAME = 'Kunal Singh';

export const TAGLINE =
  'Designer at heart and curious by habit. Happiest with a good book, a good album, and a problem worth untangling.';

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
      as a design intern and learned the job the slow way, through documentation, research and
      relentless iteration, until I was leading design for the company.
    </p>
    <p>
      These days I split my time between design and the frontend, working with the engineering team
      to turn designs into production code in React and Next.js. Next is Rust: I&rsquo;m learning it
      to build fast, reliable backends, so a product can go from a design file to a server without
      being handed off in between.
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
    title: 'PlayZ',
    description:
      'A browser arcade of a dozen quick games, from Snake and Tetris to Sudoku and a retro chess board, in plain HTML, CSS and JavaScript.',
    href: 'https://playz.pages.dev',
  },
  {
    title: 'Plus Compiler',
    description:
      'A minimal code playground for HTML, CSS, JS, C and Rust. Next.js and Monaco in front, Rust and Axum behind.',
    href: 'https://github.com/madebykunal/Plus-Compiler',
  },
  {
    title: 'Noteiler',
    description:
      'A calm, distraction-free writing editor for getting words down without the noise.',
    href: 'https://github.com/madebykunal/Noteiler',
  },
];

export const WORK: Entry[] = [
  {
    label: 'calxmap.com',
    title: 'Calxmap — the expert marketplace platform',
    description:
      'Book any expert, anytime and anywhere. I started here as a design intern and now lead design, while working with the engineering team on the frontend.',
    href: LINKS.calxmap,
  },
  {
    label: 'calxbook.com',
    title: 'Calxbook — learn live from verified experts',
    description:
      'Master any skill with the expert of your choice, in live sessions. Designed and built alongside the same team.',
    href: 'https://calxbook.com',
  },
];

export const FOOTER_LINE = 'Good things happen once, others are created.';
