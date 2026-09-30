'use client';

import { useEffect } from 'react';

const IDLE_AFTER = 900;

export function ScrollActivity() {
  useEffect(() => {
    const root = document.documentElement;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let active = false;

    const settle = () => {
      active = false;
      root.dataset.scrollbar = 'idle';
    };

    const onScroll = () => {
      if (!active) {
        active = true;
        root.dataset.scrollbar = 'active';
      }
      clearTimeout(timer);
      timer = setTimeout(settle, IDLE_AFTER);
    };

    settle();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
      delete root.dataset.scrollbar;
    };
  }, []);

  return null;
}
