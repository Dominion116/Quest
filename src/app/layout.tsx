import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { AppKitProvider } from '../lib/wagmi'

export const metadata: Metadata = {
  title: 'Quest - Blockchain Geography Quiz',
  description: 'A geography quiz application on the blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script id="ethereum-fix" strategy="beforeInteractive">
          {`
            // Prevent wallet extension conflicts
            (function() {
              if (typeof window !== 'undefined' && window.ethereum) {
                const originalEthereum = window.ethereum;
                Object.defineProperty(window, 'ethereum', {
                  get() { return originalEthereum; },
                  set() { return originalEthereum; },
                  configurable: false
                });
              }
            })();
          `}
        </Script>
      </head>
      <body className="font-sans">
        <AppKitProvider>
          {children}
        </AppKitProvider>
      </body>
    </html>
  )
}