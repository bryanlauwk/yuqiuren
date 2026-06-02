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
        className="max-w-6xl w-[96vw] p-0 gap-0 border-primary/30 bg-background/95 backdrop-blur-xl overflow-hidden"
      >
        <DialogTitle className="sr-only">{sessionLabel} — {t.highlights.title}</DialogTitle>

        {/* Header strip */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-black/40 px-4 py-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
            <Film className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-wider text-primary/80">
              {t.highlights.title}
            </p>
            <p className="truncate text-sm font-semibold text-foreground">{sessionLabel}</p>
          </div>
          <span className="text-xs text-muted-foreground">
            {items.length > 0 ? `${activeIndex + 1} / ${items.length}` : '0'}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <Film className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">{t.highlights.empty}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-[1fr_280px] gap-0 max-h-[80vh]">
            {/* Main player */}
            <div className="p-4 md:p-5 bg-black/60">
              {active && (
                <LiteYouTubeEmbed
                  key={active.raw.id}
                  videoId={active.id}
                  title={active.raw.title || undefined}
                  autoPlay
                />
              )}
              {active?.raw.title && (
                <p className="mt-3 text-sm font-medium text-foreground">
                  {active.raw.title}
                </p>
              )}
            </div>

            {/* Thumbnail list */}
            <div className="border-t md:border-t-0 md:border-l border-border/40 bg-black/30 overflow-y-auto p-3 md:max-h-[80vh]">
              <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
                {items.map((it, i) => (
                  <button
                    key={it.raw.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      'group relative aspect-video w-full overflow-hidden rounded-md border-2 transition-all',
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
