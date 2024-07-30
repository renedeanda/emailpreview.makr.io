
import React from 'react';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "HTML Email Preview Tool - Visualize Your Email Designs Instantly",
  description: "Free HTML email preview tool. Instantly visualize your email designs before sending. Perfect for email marketers and developers.",
  keywords: "HTML email, email preview, email testing, email development",
  openGraph: {
    title: "HTML Email Preview Tool - Visualize Your Email Designs Instantly",
    description: "Free HTML email preview tool. Instantly visualize your email designs before sending. Perfect for email marketers and developers.",
    type: 'website',
    url: 'https://html-email-previewer.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: "HTML Email Preview Tool - Visualize Your Email Designs Instantly",
    description: "Free HTML email preview tool. Instantly visualize your email designs before sending. Perfect for email marketers and developers.",
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon.svg',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link href="https://fonts.googleapis.com/css2?family=Iowan+Old+Style&display=swap" rel="stylesheet" />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
