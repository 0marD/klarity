import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://klarity.dev'),
  title: {
    default: 'Klarity — Desarrollo de Software a Medida',
    template: '%s | Klarity',
  },
  description:
    'No vendemos código. Resolvemos negocios. Desarrollo de software personalizado orientado a resultados de negocio.',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('klarity_theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', t);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        {children}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Script
            id="ga4-loader"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var GA_ID = '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}';
                  function loadGA() {
                    var s = document.createElement('script');
                    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
                    s.async = true;
                    document.head.appendChild(s);
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    window.gtag = gtag;
                    gtag('js', new Date());
                    gtag('config', GA_ID);
                  }
                  try {
                    var consent = JSON.parse(localStorage.getItem('klarity_cookie_consent') || 'null');
                    if (consent && consent.analytics) loadGA();
                  } catch(e) {}
                  window.addEventListener('consent-updated', function(e) {
                    if (e.detail && e.detail.analytics) loadGA();
                  });
                })();
              `,
            }}
          />
        )}
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
