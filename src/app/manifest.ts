import type { MetadataRoute } from 'next';

import { SITE_NAME, TAGLINE } from '@/content/home';
import { HANDLE } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: HANDLE,
    description: TAGLINE,
    start_url: '/',
    display: 'browser',
    background_color: '#1a1a1a',
    theme_color: '#1a1a1a',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
