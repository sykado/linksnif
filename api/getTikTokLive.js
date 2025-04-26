import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }

  try {
    const response = await fetch(`https://www.tiktok.com/@${username}/live`);
    const html = await response.text();

    const dom = new JSDOM(html);
    const scripts = dom.window.document.querySelectorAll('script');

    let liveData = null;

    for (let script of scripts) {
      if (script.textContent.includes('LIVE_ROOM')) {
        const regex = /"LIVE_ROOM":(.*?),"user"/;
        const match = script.textContent.match(regex);
        if (match && match[1]) {
          liveData = JSON.parse(match[1]);
          break;
        }
      }
    }

    if (!liveData) {
      return res.status(404).json({ error: 'User is not live or no live data found' });
    }

    const streamUrl = liveData?.stream_url?.live_core_sdk_data?.pull_data?.stream_data?.hls_pull_url;

    if (!streamUrl) {
      return res.status(404).json({ error: 'Stream URL not found' });
    }

    return res.status(200).json({ streamUrl });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}