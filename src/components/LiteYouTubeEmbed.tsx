import { useState } from 'react';
import { Play } from 'lucide-react';
import { youtubeEmbedUrl, youtubeThumbnail } from '@/lib/youtube';
import { cn } from '@/lib/utils';

interface LiteYouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  /** Auto-play immediately by mounting the iframe on first render. */
  autoPlay?: boolean;
}

/**
 * Lightweight YouTube player: shows thumbnail + play button until clicked,
 * then swaps in a real iframe. Avoids loading dozens of iframes upfront.
 */
export function LiteYouTubeEmbed({ videoId, title, className, autoPlay = false }: LiteYouTubeEmbedProps) {
  const [activated, setActivated] = useState(autoPlay);

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-lg bg-black',
        className,
      )}
    >
      {activated ? (
        <iframe
          src={youtubeEmbedUrl(videoId)}
          title={title || 'Match highlight'}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play ${title || 'highlight'}`}
        >
          <img
            src={youtubeThumbnail(videoId, 'hq')}
            alt={title || 'Highlight thumbnail'}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 shadow-2xl shadow-primary/40 transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-primary-foreground text-primary-foreground" />
            </div>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
              <p className="line-clamp-2 text-sm font-medium text-white drop-shadow">
                {title}
              </p>
            </div>
          )}
        </button>
      )}
    </div>
  );
}
