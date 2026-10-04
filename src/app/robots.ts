import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/content/profile';

// Bulk SEO-index crawlers: they send nothing back to the site, only load. Search engines and AI
// crawlers stay allowed by the catch-all. robots.txt is a request, not a wall, so nobody is
// actually locked out.
const SCRAPERS = [
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'DataForSeoBot',
  'serpstatbot',
  'Barkrowler',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: SCRAPERS, disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
