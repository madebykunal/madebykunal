import { BASED_IN, SITE_NAME, TAGLINE } from '@/content/home';
import { HANDLE, LINKS, SITE_URL } from '@/content/profile';

const HOME = `${SITE_URL}/`;
const PERSON = { '@id': `${SITE_URL}/#person` };
const WEBSITE = { '@id': `${SITE_URL}/#website` };

// WebSite.name is what Google shows as the site name above the result, so the handle goes there;
// alternateName covers the other ways people type it.
const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      ...WEBSITE,
      url: HOME,
      name: HANDLE,
      alternateName: [SITE_NAME, 'made by kunal', 'madebykunal.com'],
      description: TAGLINE,
      inLanguage: 'en',
      publisher: PERSON,
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profile`,
      url: HOME,
      name: SITE_NAME,
      description: TAGLINE,
      inLanguage: 'en',
      isPartOf: WEBSITE,
      mainEntity: PERSON,
    },
    {
      '@type': 'Person',
      ...PERSON,
      name: SITE_NAME,
      givenName: 'Kunal',
      familyName: 'Singh',
      alternateName: HANDLE,
      url: HOME,
      description: TAGLINE,
      jobTitle: 'Product Designer and Frontend Engineer',
      worksFor: { '@type': 'Organization', name: 'Calxmap', url: LINKS.calxmap },
      homeLocation: { '@type': 'Country', name: BASED_IN },
      knowsAbout: [
        'Product design',
        'Interface design',
        'Frontend engineering',
        'React',
        'Next.js',
        'Rust',
      ],
      sameAs: [LINKS.github, LINKS.linkedin],
    },
  ],
};

// Escape `<` so no string in the payload can close the <script> it is inlined into.
export const STRUCTURED_DATA = JSON.stringify(graph).replace(/</g, '\\u003c');
