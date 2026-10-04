import { ImageResponse } from 'next/og';

import { SITE_NAME, TAGLINE } from '@/content/home';

export const alt = `${SITE_NAME}: ${TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const DOMAIN = 'madebykunal.com';

// Subset each face to the glyphs drawn below. Without a user agent, Google Fonts serves TTF,
// which is what the image renderer reads.
async function googleFont(family: string, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
    ).then((res) => res.text());
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return src ? await fetch(src).then((res) => res.arrayBuffer()) : undefined;
  } catch {
    return undefined;
  }
}

export default async function Image() {
  const [display, sans] = await Promise.all([
    googleFont('Newsreader:opsz@72', SITE_NAME),
    googleFont('Figtree', `${TAGLINE}${DOMAIN}`),
  ]);

  const fonts = [
    ...(display ? [{ name: 'Newsreader', data: display, weight: 400 as const }] : []),
    ...(sans ? [{ name: 'Figtree', data: sans, weight: 400 as const }] : []),
  ];

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '84px 96px',
        background: '#0e0e10',
        fontFamily: 'Figtree',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 22, height: 22, borderRadius: 11, background: '#8fa8d6' }} />
        <div style={{ fontSize: 28, color: '#929398' }}>{DOMAIN}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          style={{
            fontFamily: 'Newsreader',
            fontSize: 132,
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            color: '#ecece8',
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ maxWidth: 900, fontSize: 38, lineHeight: 1.45, color: '#bdbdb8' }}>
          {TAGLINE}
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
