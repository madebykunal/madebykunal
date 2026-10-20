'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

const getYear = () => String(new Date().getFullYear());

const getServerYear = () => null;

export function Year() {
  const year = useSyncExternalStore(subscribe, getYear, getServerYear);

  if (!year) return null;

  return (
    <time dateTime={year} className="tabular-nums">
      {year}
    </time>
  );
}
