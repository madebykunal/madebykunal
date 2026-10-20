import type { ReactNode } from 'react';

import { EXTERNAL, LINKS, MAIL } from '@/content/profile';

export const SITE_NAME = 'Kunal Singh';

export const ROLE = 'Product Engineer';

export const TAGLINE =
  'Shaping ideas into products. Designing and building them from the first sketch to the last commit.';

export const BASED_IN = 'India';

export type Entry = {
  title: string;
  description: string;
  href: string;
};

export const INTRO: ReactNode = (
  <>
    <p>
      <em>Shaping ideas into products</em>. Designing and building them from the first sketch to the
      last commit. Currently buried in Rust’s lifetimes. {ROLE} at{' '}
      <a href={LINKS.calxmap} {...EXTERNAL}>
        Calxmap
      </a>
      .
    </p>
    <p>
      Self taught, mostly. Learned by doing the work and then doing it better. Started at Calxmap as
      a design intern and ended up leading design for Calxmap and{' '}
      <a href={LINKS.calxbook} {...EXTERNAL}>
        Calxbook
      </a>
      .
    </p>
  </>
);

export const WORK: Entry[] = [
  {
    title: 'Calxmap',
    description: 'Book any expert, anytime.',
    href: LINKS.calxmap,
  },
  {
    title: 'Calxbook',
    description: 'Learn live from verified experts.',
    href: LINKS.calxbook,
  },
];

export const PROJECTS: Entry[] = [
  {
    title: 'Plus Compiler',
    description: 'Code playground backed by Rust.',
    href: 'https://github.com/madebykunal/Plus-Compiler',
  },
  {
    title: 'Noteiler',
    description: 'A calm, distraction-free editor.',
    href: 'https://github.com/madebykunal/Noteiler',
  },
  {
    title: 'PlayZ',
    description: 'A dozen quick browser games.',
    href: 'https://playz.pages.dev',
  },
];

export const NOW: ReactNode = (
  <>
    <p>
      Going deeper into the web, and getting better at Rust. The goal is one person taking a product
      from a design file to a server, <em>with no handoff in between.</em>
    </p>
    <p>Usually reading something, sometimes writing. And there’s almost always music on.</p>
  </>
);

export const CONNECT: ReactNode = (
  <p>
    Reach me at <a href={`mailto:${MAIL}`}>{MAIL}</a>, or find me on{' '}
    <a href={LINKS.linkedin} {...EXTERNAL}>
      LinkedIn
    </a>{' '}
    and{' '}
    <a href={LINKS.github} {...EXTERNAL}>
      GitHub
    </a>
    .
  </p>
);

export const FOOTER_LINE = 'Good things happen once, others are created.';
