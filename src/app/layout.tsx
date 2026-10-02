import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Figtree, JetBrains_Mono, Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';

import { ScrollActivity } from '@/components/scroll-activity';

import './globals.css';

const sans = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

const display = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-newsreader',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'Kunal Singh',
  description:
    'Kunal Singh is a product designer and engineer at Calxmap who builds for the web and is learning Rust.',
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0e0e10',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        {children}
        <ScrollActivity />
        <Analytics />
      </body>
    </html>
  );
}
