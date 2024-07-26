
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Home() {
  const [htmlInput, setHtmlInput] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setHtmlInput(e.target.value);
    setError(null);
  };

  const handlePreview = () => {
    try {
      // Basic validation
      if (htmlInput.includes('<script>')) {
        throw new Error('Script tags are not allowed for security reasons.');
      }
      // More validation can be added here
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>HTML Email Preview Tool | Visualize Your Emails Instantly</title>
        <meta name="description" content="Free tool for email marketers and developers to preview HTML emails. Instantly visualize your email designs before sending. Desktop and mobile friendly." />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <header className="bg-amber-500 p-4 text-white">
        <div className="container mx-auto">
          <Link href="https://rede.io?utm_source=html-email-previewer" className="text-sm hover:underline">
            Powered by Rede.io - Your Daily Tech Newsletter
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-iowan-old-style mb-6">HTML Email Preview Tool</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <textarea
              className="w-full h-64 p-2 border border-gray-300 rounded"
              value={htmlInput}
              onChange={handleInputChange}
              placeholder="Paste your HTML email code here"
            />
            <button
              className="mt-2 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
              onClick={handlePreview}
            >
              Preview
            </button>
          </div>
          <div>
            <div className="border border-gray-300 rounded p-4 h-64 overflow-auto">
              {error ? (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: htmlInput }} />
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-8 bg-gray-200 p-4 text-center">
        <p>&copy; 2024 HTML Email Preview Tool. All rights reserved.</p>
      </footer>
    </div>
  );
}
    