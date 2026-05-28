import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.scss';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const TITLE = 'Olga Fredrick — Business Growth Systems · Web, Mobile, CRM & Automation';
const DESCRIPTION =
  'Clean, high-converting websites and native mobile apps paired with smart CRM systems and automations — built to help businesses generate leads, stay organized, and scale faster.';
const SITE_URL = 'https://olga.syntria.io';
const OG_IMAGE = '/images/portrait-hero.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Olga Fredrick',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Olga Fredrick' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
