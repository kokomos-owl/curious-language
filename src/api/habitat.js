const API_BASE = 'https://habitat-api.fly.dev';

async function api(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function observeCorpusText(corpus) {
  return api(`/api/observe/corpus-text?corpus=${encodeURIComponent(corpus)}`);
}

export async function observeStart(corpus) {
  return api('/api/observe/start', {
    method: 'POST',
    body: JSON.stringify({ corpus }),
  });
}

export async function observeDrop(sessionId, text = null) {
  return api('/api/observe/drop', {
    method: 'POST',
    body: JSON.stringify({ session_id: sessionId, text }),
  });
}
