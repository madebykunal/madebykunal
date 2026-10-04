import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// iOS fills transparency with black and rounds the corners itself, so paint the page colour
// edge to edge and inset the dot from icon.svg.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0e0e10',
      }}
    >
      <div style={{ width: 96, height: 96, borderRadius: 48, background: '#8fa8d6' }} />
    </div>,
    size,
  );
}
