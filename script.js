document.getElementById('extractBtn').addEventListener('click', async () => {
  const url = document.getElementById('tiktokUrl').value.trim();
  const resultDiv = document.getElementById('result');
  const errorDiv = document.getElementById('error');

  // Reset UI
  errorDiv.classList.add('hidden');
  resultDiv.classList.add('hidden');

  if (!url) {
    showError('Please enter a TikTok live URL');
    return;
  }

  try {
    const response = await fetch(`/api/extract?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.error) {
      showError(data.error);
      return;
    }

    document.getElementById('streamUrl').value = data.streamUrl;
    document.getElementById('vlcLink').href = `vlc://${data.streamUrl}`;
    resultDiv.classList.remove('hidden');
  } catch (err) {
    showError('Failed to extract URL. Try again later.');
  }
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const textarea = document.getElementById('streamUrl');
  textarea.select();
  document.execCommand('copy');
  alert('Copied to clipboard!');
});

function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}