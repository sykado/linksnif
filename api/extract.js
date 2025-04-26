const { exec } = require('child_process');

module.exports = async (req, res) => {
  const { url } = req.query;

  // Validate URL
  if (!url || !url.includes('tiktok.com')) {
    return res.status(400).json({ error: 'Invalid TikTok URL' });
  }

  // Use yt-dlp to extract stream URL
  exec(`yt-dlp -g "${url}"`, { timeout: 10000 }, (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', stderr);
      return res.status(500).json({ error: 'Failed to extract stream URL' });
    }
    res.json({ streamUrl: stdout.trim() });
  });
};