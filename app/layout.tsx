import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { LiveEnergyProvider } from '../context/LiveEnergyContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://herthafirnberg-energie.at'),
  title: 'Energiezelle Hertha Firnberg | Generate locally. Close the gap. Scale resilience.',
  description:
    'Vernetzte, resiliente Energie-Gemeinschaft im Quartier Hertha-Firnberg-Straße (1100 Wien). Maximized Rooftop Solar, High-Capacity Storage und V2H/V2G E-Mobilität.',
  keywords: [
    'Energiegemeinschaft',
    'Energiezelle',
    'Hertha Firnberg',
    'Wienerbergcity',
    'Photovoltaik Wien',
    'V2H',
    'V2G',
    'Batteriespeicher Quartier',
    'ElWOG § 16a',
    'EAG Erneuerbare-Energie-Gemeinschaft',
    'Resilienz',
  ],
  authors: [{ name: 'Energiezelle Hertha Firnberg' }],
  openGraph: {
    title: 'Energiezelle Hertha Firnberg | Vernetzte Energie-Gemeinschaft',
    description:
      'Generate locally. Close the gap. Scale resilience. Wir transformieren Wohnanlagen in vernetzte, krisensichere Energiezellen.',
    url: 'https://herthafirnberg-energie.at',
    siteName: 'Energiezelle Hertha Firnberg',
    images: [
      {
        url: '/images/neighborhood-network.png',
        width: 1200,
        height: 630,
        alt: 'Hertha Firnberg Vernetztes Quartier',
      },
    ],
    locale: 'de_AT',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Energiegemeinschaft Hertha Firnberg',
    url: 'https://herthafirnberg-energie.at',
    logo: 'https://herthafirnberg-energie.at/images/logo.png',
    description:
      'Generate locally. Close the gap. Scale resilience. Pionierquartier für dezentrale solare Energiezellen und Batteriespeicher in Wien.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hertha-Firnberg-Straße',
      addressLocality: 'Wien',
      postalCode: '1100',
      addressCountry: 'AT',
    },
  };

  return (
    <html lang="de" className="scroll-smooth dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-forest-950 text-offwhite antialiased min-h-screen selection:bg-lime selection:text-forest-950">
        <LanguageProvider>
          <LiveEnergyProvider>
            {children}
          </LiveEnergyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
