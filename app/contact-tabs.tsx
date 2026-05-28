'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { IconArrow } from './icons';

const CAL_LINK = 'olgafredrick/30min';
const CAL_NS = '30min';

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

type CalApi = {
  (...args: unknown[]): void;
  ns: Record<string, CalApi>;
  loaded?: boolean;
  q?: unknown[];
};

type Mode = 'call' | 'message';

function CalInline() {
  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: unknown) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal;
        const ar = args;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function (...args2: unknown[]) { p(api, args2); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');
    /* eslint-enable @typescript-eslint/no-explicit-any */

    const Cal = window.Cal!;
    Cal('init', CAL_NS, { origin: 'https://cal.com' });
    Cal.ns[CAL_NS]('inline', {
      elementOrSelector: '#cal-inline',
      config: { layout: 'column_view', theme: 'light' },
      calLink: CAL_LINK,
    });
    Cal.ns[CAL_NS]('ui', {
      cssVarsPerTheme: {
        light: {
          'cal-brand': '#121110',
          'cal-brand-emphasis': '#000000',
          'cal-bg': '#efece6',
          'cal-bg-default': '#efece6',
          'cal-bg-subtle': '#efece6',
          'cal-bg-muted': '#efece6',
          'cal-bg-emphasis': '#e9e3d5',
          'cal-bg-inverted': '#121110',
          'cal-border': '#d8d2c4',
          'cal-border-subtle': '#e2dccc',
          'cal-text': '#121110',
          'cal-text-emphasis': '#000000',
          'cal-text-muted': '#6b685e',
          'cal-text-subtle': '#8a8678',
        },
      },
      hideEventTypeDetails: false,
      layout: 'column_view',
    });
  }, []);

  return (
    <div
      className={styles.calWrap}
      role="tabpanel"
      id="contact-panel-call"
      aria-labelledby="contact-tab-call"
    >
      <div id="cal-inline" className={styles.calInline} />
    </div>
  );
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

function MessageForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === 'submitting') return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      company: data.get('company'),
      projectType: data.get('projectType'),
      message: data.get('message'),
      website: data.get('website'), // honeypot — must be empty
    };

    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !json.ok) {
        setStatus({
          kind: 'error',
          message: json.error ?? 'Could not send your message. Please try again.',
        });
        return;
      }

      setStatus({ kind: 'success' });
      form.reset();
    } catch {
      setStatus({
        kind: 'error',
        message:
          'Network error. Check your connection and try again, or email directly.',
      });
    }
  }

  if (status.kind === 'success') {
    return (
      <div className={styles.formStatusSuccess} role="status" aria-live="polite">
        <h3>Message sent.</h3>
        <p>
          Thanks for reaching out — I'll get back to you within 1–2 business
          days at the email you provided.
        </p>
        <button
          type="button"
          className={styles.formStatusReset}
          onClick={() => setStatus({ kind: 'idle' })}
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status.kind === 'submitting';

  return (
    <form
      className={styles.form}
      role="tabpanel"
      id="contact-panel-message"
      aria-labelledby="contact-tab-message"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot — hidden from humans, irresistible to bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
      />
      <div className={styles.formRow}>
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          aria-label="Your Name"
          disabled={submitting}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your Email"
          aria-label="Your Email"
          disabled={submitting}
        />
      </div>
      <div className={styles.formRow}>
        <input
          type="text"
          name="company"
          placeholder="Company (optional)"
          aria-label="Company"
          disabled={submitting}
        />
        <select
          name="projectType"
          aria-label="Project Type"
          defaultValue=""
          disabled={submitting}
        >
          <option value="" disabled>
            Project Type
          </option>
          <option>Website</option>
          <option>Mobile App</option>
          <option>Dashboard</option>
          <option>Other</option>
        </select>
      </div>
      <textarea
        name="message"
        required
        placeholder="Tell me about your project"
        rows={5}
        disabled={submitting}
      />

      {status.kind === 'error' && (
        <p className={styles.formStatusError} role="alert">
          {status.message}
        </p>
      )}

      <div className={styles.formActions}>
        <button
          type="submit"
          className={styles.btnDark}
          disabled={submitting}
          aria-busy={submitting}
        >
          <span>{submitting ? 'SENDING…' : 'SEND MESSAGE'}</span>
          {!submitting && <IconArrow />}
        </button>
        <p className={styles.formAside}>
          Or email me directly
          <br />
          <a href="mailto:olga@syntria.io">olga@syntria.io</a>
        </p>
      </div>
    </form>
  );
}

export function ContactTabs() {
  const [mode, setMode] = useState<Mode>('call');

  return (
    <>
      <div className={styles.contactTabs} role="tablist" aria-label="Contact options">
        <button
          type="button"
          role="tab"
          id="contact-tab-call"
          aria-selected={mode === 'call'}
          aria-controls="contact-panel-call"
          tabIndex={mode === 'call' ? 0 : -1}
          className={`${styles.contactTab} ${mode === 'call' ? styles.contactTabActive : ''}`}
          onClick={() => setMode('call')}
        >
          Book a call
        </button>
        <button
          type="button"
          role="tab"
          id="contact-tab-message"
          aria-selected={mode === 'message'}
          aria-controls="contact-panel-message"
          tabIndex={mode === 'message' ? 0 : -1}
          className={`${styles.contactTab} ${mode === 'message' ? styles.contactTabActive : ''}`}
          onClick={() => setMode('message')}
        >
          Send a message
        </button>
      </div>

      {mode === 'call' ? <CalInline /> : <MessageForm />}
    </>
  );
}
