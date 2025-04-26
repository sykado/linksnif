'use client';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getLiveStream = async () => {
    if (!username) return;
    setLoading(true);
    setError('');
    setStreamUrl('');

    try {
      const res = await fetch(`/api/getTikTokLive?username=${username}`);
      const data = await res.json();

      if (data.streamUrl) {
        setStreamUrl(data.streamUrl);
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      setError('Failed to fetch stream URL');
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
      <h1>TikTok Live Stream Fetcher</h1>
      <input
        type="text"
        placeholder="Enter TikTok username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
      />
      <button onClick={getLiveStream} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Loading...' : 'Get Stream URL'}
      </button>

      {streamUrl && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Stream URL:</h3>
          <a href={streamUrl} target="_blank" rel="noopener noreferrer">{streamUrl}</a>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '2rem', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}