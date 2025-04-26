import React from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TikTok Live Fetcher</title>
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
          {children}
        </div>
      </body>
    </html>
  );
}