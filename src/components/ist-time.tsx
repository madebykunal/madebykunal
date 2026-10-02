'use client';

import { useMinute } from '@/lib/use-minute';

const TIME_ZONE = 'Asia/Kolkata';

const timeFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

const dateFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const isoDateFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function Clock() {
  const now = useMinute();
  if (!now) return <time>--:-- --</time>;
  return <time dateTime={now.toISOString()}>{timeFormat.format(now)}</time>;
}

export function Today() {
  const now = useMinute();
  if (!now) return null;
  return <time dateTime={isoDateFormat.format(now)}>{dateFormat.format(now)}</time>;
}
