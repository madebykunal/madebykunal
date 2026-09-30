'use client';

import { useEffect, useRef, useState } from 'react';

import { MAIL } from '@/content/profile';

const RESET_AFTER = 2400;

type CopyState = 'idle' | 'copied' | 'failed';

export function CopyMail({ className }: { className?: string }) {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    let copied = true;
    try {
      await navigator.clipboard.writeText(MAIL);
    } catch {
      copied = false;
    }

    setState(copied ? 'copied' : 'failed');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), RESET_AFTER);
  };

  return (
    <>
      <button type="button" onClick={copy} title={MAIL} className={className}>
        <span className="grid">
          <span
            className={`col-start-1 row-start-1 ${state === 'copied' ? 'invisible' : ''}`}
            aria-hidden={state === 'copied' ? true : undefined}
          >
            Copy email
          </span>
          <span
            className={`col-start-1 row-start-1 ${state === 'copied' ? '' : 'invisible'}`}
            aria-hidden={state === 'copied' ? undefined : true}
          >
            Copied
          </span>
        </span>
      </button>
      <span role="status" className="sr-only">
        {state === 'copied'
          ? 'Email address copied.'
          : state === 'failed'
            ? `Copy failed. The address is ${MAIL}`
            : ''}
      </span>
    </>
  );
}
