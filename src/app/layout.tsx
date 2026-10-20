import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import { ScrollActivity } from '@/components/scroll-activity';
import { ROLE, SITE_NAME, TAGLINE } from '@/content/home';
import { DOMAIN, HANDLE, SITE_URL } from '@/content/profile';

import './globals.css';

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
});

const display = Inter({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-inter',
});

const serif = localFont({
  src: './fonts/newsreader-italic.woff2',
  style: 'italic',
  weight: '400',
  variable: '--font-newsreader',
  adjustFontFallback: 'Times New Roman',
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
    DOMAIN,
    SITE_NAME,
    `${SITE_NAME} ${ROLE}`,
    ROLE,
    'Product Designer',
    'Calxmap',
    'Calxbook',
    'Rust',
    'React',
    'Next.js',
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
  themeColor: '#1a1a1a',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${serif.variable}`}>
      <body>
        {children}
        <ScrollActivity />
        <Analytics />
      </body>
    </html>
  );
}
