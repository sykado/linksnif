document.getElementById('extractBtn').addEventListener('click', () => {
    const tiktokUrl = document.getElementById('tiktokUrl').value.trim();
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    // Reset UI
    errorDiv.classList.add('hidden');
    resultDiv.classList.add('hidden');

    if (!tiktokUrl) {
        showError('Please enter a TikTok live URL.');
        return;
    }

    if (!tiktokUrl.includes('tiktok.com')) {
        showError('Invalid URL. Must be a TikTok live stream (e.g., https://www.tiktok.com/@username/live).');
        return;
    }

    // Simulate extraction (user must manually run yt-dlp)
    document.getElementById('streamUrl').value = `Manually extract with: yt-dlp -g "${tiktokUrl}"`;
    resultDiv.classList.remove('hidden');
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const streamUrl = document.getElementById('streamUrl');
    streamUrl.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
});

document.getElementById('openVlcBtn').addEventListener('click', () => {
    const streamUrl = document.getElementById('streamUrl').value;
    if (streamUrl.includes('http')) {
        window.open(`vlc://${streamUrl}`);
    } else {
        alert('Paste a valid stream URL first.');
    }
});

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}