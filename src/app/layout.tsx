import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Figtree, JetBrains_Mono, Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';

import { ScrollActivity } from '@/components/scroll-activity';
import { SITE_NAME, TAGLINE } from '@/content/home';
import { HANDLE, SITE_URL } from '@/content/profile';

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
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: TAGLINE,
  applicationName: HANDLE,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    HANDLE,
    'made by kunal',
    SITE_NAME,
    'product designer',
    'frontend engineer',
    'React',
    'Next.js',
    'Rust',
    'Calxmap',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: HANDLE,
    title: SITE_NAME,
    description: TAGLINE,
    locale: 'en_US',
    firstName: 'Kunal',
    lastName: 'Singh',
    username: HANDLE,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: TAGLINE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
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
