import { BASED_IN, ROLE, SITE_NAME, TAGLINE } from '@/content/home';
import { DOMAIN, HANDLE, LINKS, MAIL, SITE_URL } from '@/content/profile';

const HOME = `${SITE_URL}/`;
const PERSON = { '@id': `${SITE_URL}/#person` };
const WEBSITE = { '@id': `${SITE_URL}/#website` };

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      ...WEBSITE,
      url: HOME,
      name: HANDLE,
      alternateName: [SITE_NAME, 'made by kunal', DOMAIN],
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
      dateModified: new Date().toISOString(),
      isPartOf: WEBSITE,
      mainEntity: PERSON,
    },
    {
      '@type': 'Person',
      ...PERSON,
      name: SITE_NAME,
      givenName: 'Kunal',
      familyName: 'Singh',
      alternateName: [HANDLE, 'made by kunal'],
      url: HOME,
      email: `mailto:${MAIL}`,
      description: TAGLINE,
      jobTitle: ROLE,
      worksFor: { '@type': 'Organization', name: 'Calxmap', url: LINKS.calxmap },
      homeLocation: { '@type': 'Country', name: BASED_IN },
      knowsAbout: [
        'Product engineering',
        'Product design',
        'Interface design',
        'Rust',
        'React',
        'Next.js',
      ],
      sameAs: [LINKS.github, LINKS.linkedin],
    },
  ],
};

export const STRUCTURED_DATA = JSON.stringify(graph).replace(/</g, '\\u003c');
