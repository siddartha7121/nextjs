import { useEffect, useState } from 'react';

export default function Home() {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch HTML using Puppeteer via the API route
  const fetchHtmlWithPuppeteer = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/test');
      const data = await res.json();

      if (res.ok) {
        setHtmlContent(data.html);  // Set the HTML content in state
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error('Error fetching HTML:', err);
      setError('Error fetching HTML');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHtmlWithPuppeteer();
  }, []);

  return (
    <div>
      <h1>Puppeteer Test - Scraped HTML</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <textarea
          value={htmlContent}
          readOnly
          rows={20}
          cols={100}
        />
      </div>
    </div>
  );
}
