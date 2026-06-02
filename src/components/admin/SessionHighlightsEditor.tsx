import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Film, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { useSessionHighlights } from '@/hooks/useHighlights';
import { parseYouTubeId, youtubeThumbnail } from '@/lib/youtube';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TournamentSession } from '@/types/ranking';
import { format } from 'date-fns';

interface SessionHighlightsEditorProps {
  session: TournamentSession;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SessionHighlightsEditor({ session, open, onOpenChange }: SessionHighlightsEditorProps) {
  const { t } = useLanguage();
  const { highlights, addHighlight, deleteHighlight, reorderHighlight } = useSessionHighlights(
    open ? session.id : null,
  );
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async () => {
    const id = parseYouTubeId(url);
    if (!id) {
      toast.error(t.highlights.invalidUrl);
      return;
    }
    setSubmitting(true);
    try {
      await addHighlight(url.trim(), title.trim() || null);
      setUrl('');
      setTitle('');
      toast.success(t.highlights.added);
    } catch (e) {
      console.error(e);
      toast.error('Failed to add highlight');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMove = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= highlights.length) return;
    const a = highlights[index];
    const b = highlights[target];
    await Promise.all([
      reorderHighlight(a.id, b.sort_order),
      reorderHighlight(b.id, a.sort_order),
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            {t.highlights.editorTitle}
          </DialogTitle>
          <DialogDescription>
            {format(new Date(session.session_date), 'MMM d, yyyy')}
            {session.name ? ` · ${session.name}` : ''}
          </DialogDescription>
        </DialogHeader>

        {/* Add form */}
        <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
          <Input
            placeholder={t.highlights.urlPlaceholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            maxLength={500}
          />
          <Input
            placeholder={t.highlights.titlePlaceholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
          />
          <Button
            onClick={handleAdd}
            disabled={submitting || !url.trim()}
            className="w-full"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t.highlights.add}
          </Button>
        </div>

        {/* List */}
        {highlights.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            {t.highlights.empty}
          </div>
        ) : (
          <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
            {highlights.map((h, i) => {
              const id = parseYouTubeId(h.youtube_url);
              return (
                <div
                  key={h.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-2"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                  <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded bg-black">
                    {id && (
                      <img
                        src={youtubeThumbnail(id, 'mq')}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                    <span className="absolute left-0.5 top-0.5 rounded bg-black/70 px-1 text-[9px] font-mono text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {h.title || h.youtube_url}
                    </p>
                    {h.title && (
                      <p className="truncate text-xs text-muted-foreground">{h.youtube_url}</p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleMove(i, -1)}
                      disabled={i === 0}
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleMove(i, 1)}
                      disabled={i === highlights.length - 1}
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:bg-destructive/10"
                      onClick={() => deleteHighlight(h.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
