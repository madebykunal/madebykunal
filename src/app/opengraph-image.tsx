import { ImageResponse } from 'next/og';

import { Mark } from '@/components/mark';
import { SITE_NAME, TAGLINE } from '@/content/home';
import { DOMAIN } from '@/content/profile';

export const alt = `${SITE_NAME}: ${TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
    googleFont('Inter:wght@500', SITE_NAME),
    googleFont('Hanken+Grotesk:wght@470', `${TAGLINE}${DOMAIN}`),
  ]);

  const fonts = [
    ...(display ? [{ name: 'Inter', data: display, weight: 500 as const }] : []),
    ...(sans ? [{ name: 'Hanken Grotesk', data: sans, weight: 400 as const }] : []),
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
        background: '#1a1a1a',
        fontFamily: 'Hanken Grotesk',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <Mark size={40} color="#f2f2f2" />
        <div style={{ fontSize: 28, color: '#707070' }}>{DOMAIN}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          style={{
            fontFamily: 'Inter',
            fontSize: 112,
            fontWeight: 500,
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            color: '#f2f2f2',
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ maxWidth: 900, fontSize: 38, lineHeight: 1.45, color: '#a0a0a0' }}>
          {TAGLINE}
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
