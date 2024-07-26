import os
import subprocess

def run_command(command):
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    if process.returncode != 0:
        print(f"Error executing command: {command}")
        print(stderr.decode())
        exit(1)
    return stdout.decode()

def update_file(file_path, content):
    with open(file_path, 'w') as f:
        f.write(content)

def main():
    # Update next.config.js (unchanged from previous version)
    next_config_content = '''
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self'; frame-src 'self' data:; base-uri 'self'; form-action 'self';"
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ],
      },
    ];
  },
}

module.exports = nextConfig;
    '''
    update_file('next.config.js', next_config_content)
    print("Updated next.config.js")

    # Update page.tsx with new metadata
    page_content = '''
import { Metadata } from 'next';

export const metadata: Metadata = {
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

"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Code, Eye } from 'lucide-react';
import DOMPurify from 'dompurify';

export default function Home() {
  const [htmlInput, setHtmlInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlInput(e.target.value);
    setError(null);
  };

  const updatePreview = () => {
    if (!iframeRef.current) return;

    try {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) throw new Error('Unable to access iframe document');

      // Sanitize the input
      const sanitizedHtml = DOMPurify.sanitize(htmlInput, {
        ALLOW_UNKNOWN_PROTOCOLS: true,
        ADD_TAGS: ['style'],
        ADD_ATTR: ['target']
      });

      // Write the sanitized content
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <base target="_blank">
          </head>
          <body>
            ${sanitizedHtml}
          </body>
        </html>
      `);
      doc.close();

      setError(null);
    } catch (err) {
      setError('Error rendering HTML. Please check your code and try again.');
      console.error('Rendering error:', err);
    }
  };

  useEffect(() => {
    updatePreview();
  }, [htmlInput]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
        <div className="container mx-auto text-center">
          <Link href="https://rede.io?utm_source=html-email-previewer" className="text-lg font-semibold hover:underline inline-flex items-center">
            <span className="mr-2">📚</span> Powered by Rede.io - Your Daily Tech Newsletter
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center font-iowan-old-style text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          HTML Email Preview Tool
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6 flex-grow">
          <div className="flex-1 flex flex-col">
            <div className="relative flex-grow mb-2">
              <textarea
                className="w-full h-[calc(100vh-340px)] p-4 border-2 border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white font-mono text-sm"
                value={htmlInput}
                onChange={handleInputChange}
                placeholder="Paste your HTML code here..."
              />
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-bl rounded-tr text-xs font-semibold">
                INPUT
              </div>
            </div>
            <button
              onClick={updatePreview}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out flex items-center justify-center"
            >
              <Eye className="mr-2 h-5 w-5" />
              Generate Preview
            </button>
          </div>
          <div className="flex-1 border-2 border-purple-300 rounded-lg shadow-sm overflow-hidden bg-white relative">
            <div className="absolute top-0 right-0 bg-purple-500 text-white px-2 py-1 rounded-bl rounded-tr text-xs font-semibold">
              OUTPUT
            </div>
            {error ? (
              <div className="p-4 bg-red-100 text-red-700 flex items-start h-full">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                className="w-full h-[calc(100vh-300px)]"
                title="HTML Preview"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-6 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} HTML Email Preview Tool. All rights reserved.</p>
          <p className="mt-2 text-blue-200">
            A free tool for email marketers and developers to visualize HTML emails instantly.
          </p>
        </div>
      </footer>
    </div>
  );
}
    '''
    update_file('src/app/page.tsx', page_content)
    print("Updated src/app/page.tsx with new metadata")

    # Create favicon.svg (unchanged from previous version)
    favicon_content = '''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#4f46e5"/>
  <path d="M20 30h60v40H20z" fill="none" stroke="#fff" stroke-width="4"/>
  <path d="M20 30l30 20 30-20M20 70l25-20m35 20L55 50" stroke="#fff" stroke-width="4"/>
</svg>
    '''
    update_file('public/favicon.svg', favicon_content)
    print("Created public/favicon.svg")

    # Install necessary packages
    print("Installing DOMPurify...")
    run_command("npm install dompurify")
    run_command("npm install --save-dev @types/dompurify")

    print("Security, functionality, and metadata updates completed successfully!")
    print("Please restart your Next.js development server to apply the changes.")

if __name__ == "__main__":
    main()
