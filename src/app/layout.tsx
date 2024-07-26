
import './globals.css';
import Script from 'next/script';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Iowan+Old+Style&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
