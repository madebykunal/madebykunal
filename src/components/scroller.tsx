'use client';

import { type ReactNode, useEffect, useRef } from 'react';

export function Scroller({ children }: { children: ReactNode }) {
  const row = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = row.current;
    const bar = track.current;
    const knob = thumb.current;
    if (!el || !bar || !knob) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const overflows = scrollWidth > clientWidth + 1;

      bar.style.visibility = overflows ? 'visible' : 'hidden';
      if (!overflows) return;

      knob.style.width = `${(clientWidth / scrollWidth) * 100}%`;
      knob.style.transform = `translateX(${(scrollLeft / clientWidth) * 100}%)`;
    };

    const resize = new ResizeObserver(update);
    resize.observe(el);
    for (const child of el.children) resize.observe(child);
    el.addEventListener('scroll', update, { passive: true });
    update();

    return () => {
      resize.disconnect();
      el.removeEventListener('scroll', update);
    };
  }, []);

  return (
    <>
      <div
        ref={row}
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-8 overflow-x-auto px-6 [scrollbar-width:none] after:w-px after:shrink-0 wide:mx-0 wide:grid wide:grid-cols-2 wide:overflow-visible wide:px-0 wide:after:hidden [&::-webkit-scrollbar]:hidden [&>*]:shrink-0 [&>*]:snap-start"
      >
        {children}
      </div>
      <div
        ref={track}
        aria-hidden="true"
        style={{ visibility: 'hidden' }}
        className="mt-8 h-0.5 overflow-hidden rounded-full bg-line wide:hidden"
      >
        <div ref={thumb} className="h-full rounded-full bg-faint" />
      </div>
    </>
  );
}
