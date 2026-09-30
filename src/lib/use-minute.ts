import { useSyncExternalStore } from 'react';

const MINUTE = 60_000;

const listeners = new Set<() => void>();
let now: Date | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;

function tick() {
  now = new Date();
  for (const listener of listeners) listener();
  timer = setTimeout(tick, MINUTE - (now.getTime() % MINUTE));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) tick();

  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;
    clearTimeout(timer);
    timer = undefined;
    now = null;
  };
}

const getSnapshot = () => now;
const getServerSnapshot = () => null;

export function useMinute() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
