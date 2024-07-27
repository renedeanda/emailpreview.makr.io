"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Mail } from 'lucide-react';
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

      // Write the new content
      doc.open();
      doc.write(htmlInput);
      doc.close();

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while rendering the HTML.');
    }
  };

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write('<html><body><div id="preview-content"></div></body></html>');
        doc.close();
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
        <div className="container mx-auto text-center">
          <Link href="https://rede.io?utm_source=html-email-previewer" className="text-lg font-semibold hover:underline inline-flex items-center">
            Check out 📚 Rede.io for your daily tech newsletter!
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center font-iowan-old-style text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          HTML Email Preview Tool
        </h1>

        <div className="flex flex-col md:flex-row gap-6 flex-grow">
          <div className="w-full md:w-1/3 flex flex-col">
            <div className="relative flex-grow">
              <textarea
                className="w-full h-[calc(100vh-250px)] p-4 border-2 border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white font-mono text-sm"
                value={htmlInput}
                onChange={handleInputChange}
                placeholder="Paste your HTML email code here..."
              />
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-bl rounded-tr text-xs font-semibold">
                INPUT
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 border-2 border-purple-300 rounded-lg shadow-sm overflow-hidden bg-white relative">
            <div className="absolute top-0 right-0 bg-purple-500 text-white px-2 py-1 rounded-bl rounded-tr text-xs font-semibold">
              OUTPUT
            </div>
            {error ? (
              <div className="p-4 bg-red-100 text-red-700 flex items-start h-full">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            ) : htmlInput.trim() ? (
              <iframe
                ref={iframeRef}
                className="w-full h-[calc(100vh-250px)]"
                title="HTML Preview"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            ) : (
              <div className="h-[calc(100vh-250px)] flex flex-col items-center justify-center text-gray-400">
                <Mail className="h-16 w-16 mb-4" />
                <p className="text-lg text-center">Your email preview will appear here</p>
                <p className="text-sm text-center mt-2">Paste your HTML email code in the input box to see it rendered</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-6 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Crafted with 🧡 + 🤖 by the <Link href="https://rede.io/?utm_source=dmarc" className="text-amber-500 hover:underline">Rede team</Link></p>
          <p className="mt-2 text-blue-200">
            A free tool for email marketers and developers to visualize HTML emails instantly.
          </p>
        </div>
      </footer>
    </div>
  );
}