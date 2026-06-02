import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { LiteYouTubeEmbed } from './LiteYouTubeEmbed';
import { parseYouTubeId, youtubeThumbnail } from '@/lib/youtube';
import { cn } from '@/lib/utils';
import { Play, Film } from 'lucide-react';
import type { SessionHighlight } from '@/types/ranking';
import { useLanguage } from '@/contexts/LanguageContext';

interface HighlightsGalleryProps {
  open: boolean;
  onClose: () => void;
  highlights: SessionHighlight[];
  sessionLabel: string;
}

export function HighlightsGallery({ open, onClose, highlights, sessionLabel }: HighlightsGalleryProps) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (open) setActiveIndex(0);
  }, [open]);

  // Resolve video ids once
  const items = highlights
    .map((h) => ({ raw: h, id: parseYouTubeId(h.youtube_url) }))
    .filter((x): x is { raw: SessionHighlight; id: string } => !!x.id);

  const active = items[activeIndex];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-6xl w-[100vw] sm:w-[96vw] h-[100dvh] sm:h-auto sm:max-h-[90vh] p-0 gap-0 border-0 sm:border sm:border-primary/30 bg-background/95 backdrop-blur-xl overflow-hidden sm:rounded-lg rounded-none flex flex-col"
      >
        <DialogTitle className="sr-only">{sessionLabel} — {t.highlights.title}</DialogTitle>

        {/* Header strip */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-black/40 px-3 sm:px-4 py-3 pr-12 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary shrink-0">
            <Film className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-primary/80">
              {t.highlights.title}
            </p>
            <p className="truncate text-sm font-semibold text-foreground">{sessionLabel}</p>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {items.length > 0 ? `${activeIndex + 1} / ${items.length}` : '0'}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-20 px-6 text-center">
            <Film className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">{t.highlights.empty}</p>
          </div>
        ) : (
          <div className="flex-1 min-h-0 grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr_280px] gap-0 overflow-hidden">
            {/* Main player */}
            <div className="p-3 sm:p-4 md:p-5 bg-black/60 flex flex-col min-h-0">
              {active && (
                <div className="w-full">
                  <LiteYouTubeEmbed
                    key={active.raw.id}
                    videoId={active.id}
                    title={active.raw.title || undefined}
                    autoPlay
                  />
                </div>
              )}
              {active?.raw.title && (
                <p className="mt-2 sm:mt-3 text-sm font-medium text-foreground line-clamp-2">
                  {active.raw.title}
                </p>
              )}
            </div>

            {/* Thumbnail list */}
            <div className="border-t md:border-t-0 md:border-l border-border/40 bg-black/30 overflow-y-auto overflow-x-hidden p-2 sm:p-3 min-h-0">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-1 gap-2">
                {items.map((it, i) => (
                  <button
                    key={it.raw.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={it.raw.title || `Highlight ${i + 1}`}
                    aria-current={i === activeIndex}
                    className={cn(
                      'group relative aspect-video w-full overflow-hidden rounded-md border-2 transition-all active:scale-95',
                      i === activeIndex
                        ? 'border-primary shadow-lg shadow-primary/30'
                        : 'border-transparent hover:border-border',
                    )}
                  >
                    <img
                      src={youtubeThumbnail(it.id, 'mq')}
                      alt={it.raw.title || `Highlight ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div
                      className={cn(
                        'absolute inset-0 transition-opacity',
                        i === activeIndex
                          ? 'bg-primary/10'
                          : 'bg-black/40 group-hover:bg-black/20',
                      )}
                    />
                    <span className="absolute left-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {i === activeIndex && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/90">
                          <Play className="ml-0.5 h-3.5 w-3.5 fill-primary-foreground text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
