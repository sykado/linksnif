import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Missing username' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://www.tiktok.com/@${username}/live`);
    const html = await res.text();
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
      return NextResponse.json({ error: 'User is not live or no live data found' }, { status: 404 });
    }

    const streamUrl = liveData?.stream_url?.live_core_sdk_data?.pull_data?.stream_data?.hls_pull_url;

    if (!streamUrl) {
      return NextResponse.json({ error: 'Stream URL not found' }, { status: 404 });
    }

    return NextResponse.json({ streamUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}