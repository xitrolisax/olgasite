'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as Provider, usePostHog } from 'posthog-js/react';

const KEY = process.env.NEXT_PUBLIC_POSTHOG_LOGS_TOKEN;
const HOST = process.env.PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

if ( KEY && !posthog.__loaded) {
  posthog.init(KEY, {
    api_host: HOST,
    defaults: '2026-01-30'
  });
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (!pathname || !ph) return;
    let url = window.origin + pathname;
    const qs = searchParams?.toString();
    if (qs) url += '?' + qs;
    ph.capture('$pageview', { $current_url: url });
  }, [pathname, searchParams, ph]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!KEY) return <>{children}</>;
  return (
    <Provider client={posthog}>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </Provider>
  );
}
