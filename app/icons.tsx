type Props = { className?: string };

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconArrow = ({ className }: Props) => (
  <svg
    className={className}
    width="13"
    height="13"
    viewBox="0 0 13 13"
    aria-hidden="true"
  >
    <path d="M2 11 11 2M11 2H4M11 2v7" {...stroke} />
  </svg>
);

export const IconMonitor = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="12" rx="1" {...stroke} />
    <path d="M9 20h6M12 16v4" {...stroke} />
  </svg>
);

export const IconPhone = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="7" y="2" width="10" height="20" rx="2" {...stroke} />
    <path d="M11 18h2" {...stroke} />
  </svg>
);

export const IconCube = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Z" {...stroke} />
    <path d="m3 7.5 9 4.5 9-4.5M12 12v9" {...stroke} />
  </svg>
);

export const IconBag = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 8h14l-1 12H6L5 8Z" {...stroke} />
    <path d="M9 8a3 3 0 1 1 6 0" {...stroke} />
  </svg>
);

export const IconGear = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="3" {...stroke} />
    <path
      d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
      {...stroke}
    />
  </svg>
);

export const IconLayers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 3 9 5-9 5-9-5 9-5Z" {...stroke} />
    <path d="m3 13 9 5 9-5M3 17l9 5 9-5" {...stroke} />
  </svg>
);

export const IconPencil = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 20h4l11-11-4-4L4 16v4Z" {...stroke} />
    <path d="m13 6 4 4" {...stroke} />
  </svg>
);

export const IconBrackets = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5" {...stroke} />
  </svg>
);

export const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" {...stroke} />
  </svg>
);

export const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="1.5" {...stroke} />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" {...stroke} />
  </svg>
);

export const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path d="m4 12 5 5 11-12" {...stroke} />
  </svg>
);

export const IconDot = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
    <circle cx="4" cy="4" r="3" fill="currentColor" />
  </svg>
);

export const IconSpark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2"
      {...stroke}
    />
    <circle cx="12" cy="12" r="2.5" {...stroke} />
  </svg>
);

export const IconSpeech = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 5h16v11H9l-5 4V5Z" {...stroke} />
  </svg>
);

export const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"
      {...stroke}
    />
  </svg>
);

export const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" {...stroke} />
    <path
      d="M8 10v7M8 7v.01M12 17v-4a2 2 0 1 1 4 0v4M12 13v4"
      {...stroke}
    />
  </svg>
);

export const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" {...stroke} />
    <circle cx="12" cy="12" r="4" {...stroke} />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="1.5" {...stroke} />
    <path d="m4 7 8 6 8-6" {...stroke} />
  </svg>
);
