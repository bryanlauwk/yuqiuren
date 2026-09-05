import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';
import { useAllHighlights } from '@/hooks/useHighlights';
import { HighlightsGallery } from '@/components/HighlightsGallery';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { formatSessionDate } from '@/lib/session-date';
import { parseYouTubeId } from '@/lib/youtube';

export function LatestSessionCard() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const { sessions, loading } = useRankings();
  const { highlights } = useAllHighlights();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const latest = sessions[0];
  const sessionHighlights = highlights.filter((h) => h.session_id === latest?.id && parseYouTubeId(h.youtube_url));

  if (loading) return <div className="cs-panel h-80 animate-pulse" aria-label={isZh ? '正在加载最近活动' : 'Loading latest session'} />;
  if (!latest) return null;
  const dateLabel = formatSessionDate(latest.session_date, language);

  return (
    <aside className="min-w-0 lg:sticky lg:top-[108px]" aria-labelledby="latest-session-title">
      <div className="cs-panel overflow-hidden p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 id="latest-session-title" className="text-base font-semibold">{isZh ? '最近相聚' : 'Latest match day'}</h2>
          <CalendarDays className="h-4 w-4 text-muted-foreground" aria-hidden />
        </div>
        <p className="mt-3 text-3xl font-bold tracking-tight"><time dateTime={latest.session_date}>{formatSessionDate(latest.session_date, language, true)}</time></p>
        {latest.name && <p className="mt-2 break-words text-sm text-muted-foreground">{latest.name}</p>}
        {sessionHighlights.length > 0 && <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Play className="h-3.5 w-3.5 text-primary" aria-hidden />{sessionHighlights.length} {isZh ? '段精彩片段' : 'highlights'}</p>}
        {latest.group_photo_url && (
          <button type="button" className="mt-5 block w-full overflow-hidden rounded-lg bg-muted" onClick={() => setPhotoOpen(true)} aria-label={isZh ? `查看 ${dateLabel} 合影` : `View group photo from ${dateLabel}`}>
            <img src={latest.group_photo_url} alt={isZh ? `${dateLabel} 球友合影` : `Badminton friends on ${dateLabel}`} className="cs-photo aspect-[4/3] transition-opacity hover:opacity-90" />
          </button>
        )}
        {sessionHighlights.length > 0 ? (
          <button type="button" className="cs-action mt-4 w-full" onClick={() => setGalleryOpen(true)}><Play className="h-4 w-4 fill-current" aria-hidden />{isZh ? '查看精彩片段' : 'Watch highlights'}<ArrowRight className="h-4 w-4" aria-hidden /></button>
        ) : (
          <Link className="cs-action mt-4 w-full" to="/history">{isZh ? '查看赛事回顾' : 'View match days'}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
        )}
      </div>
      <Link to="/history" className="mt-4 flex min-h-11 items-center justify-between px-1 text-sm text-muted-foreground transition-colors hover:text-foreground">{isZh ? '所有赛事回顾' : 'All match days'}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
      <HighlightsGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} highlights={sessionHighlights} sessionLabel={dateLabel} />
      <PhotoLightbox open={photoOpen} onClose={() => setPhotoOpen(false)} images={latest.group_photo_url ? [{ src: latest.group_photo_url, alt: dateLabel }] : []} currentIndex={0} />
    </aside>
  );
}
