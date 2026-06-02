/**
 * Parse a YouTube URL or raw video ID and return the canonical 11-char ID.
 * Supports: youtu.be/ID, watch?v=ID, /shorts/ID, /embed/ID, or a plain ID.
 */
export function parseYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // Plain 11-char id
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      const id = url.pathname.slice(1).split('/')[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      const v = url.searchParams.get('v');
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = url.pathname.split('/').filter(Boolean);
      // /shorts/ID, /embed/ID, /live/ID
      const idx = parts.findIndex((p) => ['shorts', 'embed', 'live'].includes(p));
      if (idx !== -1 && parts[idx + 1]) {
        const id = parts[idx + 1];
        return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function youtubeThumbnail(id: string, quality: 'hq' | 'mq' | 'max' = 'hq'): string {
  const map = { hq: 'hqdefault', mq: 'mqdefault', max: 'maxresdefault' } as const;
  return `https://i.ytimg.com/vi/${id}/${map[quality]}.jpg`;
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
}
