"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Code, Eye } from 'lucide-react';

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
      setError('Error rendering HTML. Please check your code and try again.');
      console.error('Rendering error:', err);
    }
  };

  // Initialize iframe content
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
          <div className="flex-1 flex flex-col">
            <div className="relative flex-grow mb-2"> {/* Changed mb-4 to mb-2 */}
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
                sandbox="allow-scripts allow-same-origin"
              />
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