import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';

interface Props {
  rotate: number;
  translateY: number;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export function LatestSessionPhoto({ rotate, translateY }: Props) {
  const { language } = useLanguage();
  const { sessions, loading } = useRankings();

  const latest = useMemo(() => {
    const withPhoto = sessions.find((s) => s.group_photo_url);
    return withPhoto ?? sessions[0] ?? null;
  }, [sessions]);

  const matchIndex = useMemo(() => {
    if (!latest) return null;
    const idx = sessions.findIndex((s) => s.id === latest.id);
    return idx >= 0 ? sessions.length - idx : null;
  }, [latest, sessions]);

  return (
    <div
      className="relative bg-background border-2 border-foreground rounded-2xl shadow-[8px_8px_0_0_hsl(var(--accent))] transition-transform duration-200 ease-out will-change-transform overflow-hidden animate-fade-in-up"
      style={{
        transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
        width: 340,
      }}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground text-background px-4 py-2 gap-3">
        <span className="font-display text-[11px] tracking-[0.25em] truncate">
          {language === 'zh' ? '最新赛事合照' : 'LATEST MATCH PHOTO'}
        </span>
        <span className="flex items-center gap-1.5 bg-accent text-accent-foreground border-2 border-background rounded-md px-1.5 py-0.5 shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-background opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-background" />
          </span>
          <span className="font-display text-[9px] tracking-widest">LIVE</span>
        </span>
      </div>

      {/* Photo block */}
      <div className="relative bg-muted aspect-square w-full overflow-hidden border-b-2 border-foreground">
        {loading ? (
          <div className="w-full h-full animate-pulse-arena bg-muted" />
        ) : latest?.group_photo_url ? (
          <img
            src={latest.group_photo_url}
            alt={latest.name || 'Session group photo'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground p-4 text-center">
            <div className="font-display text-sm tracking-[0.2em]">
              {language === 'zh' ? '暂无合照' : 'NO PHOTO YET'}
            </div>
            <div className="font-display text-[10px] tracking-widest opacity-70">
              {language === 'zh' ? '管理员可在后台上传' : 'ADMIN CAN UPLOAD'}
            </div>
          </div>
        )}

        {latest && matchIndex !== null && (
          <div className="absolute top-3 left-3 bg-background border-2 border-foreground rounded-md px-2 py-1 font-display text-sm shadow-[3px_3px_0_0_hsl(var(--foreground))]">
            #{matchIndex}
          </div>
        )}

        {latest && (
          <div className="absolute bottom-3 right-3 bg-accent text-accent-foreground border-2 border-foreground rounded-md px-2 py-1 font-display text-[10px] tracking-widest shadow-[3px_3px_0_0_hsl(var(--foreground))]">
            {formatDate(latest.session_date)}
          </div>
        )}
      </div>

      {/* Minimal footer */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="font-display text-[10px] tracking-[0.2em] text-muted-foreground">
          {latest
            ? formatDate(latest.session_date)
            : language === 'zh' ? '暂无场次' : 'NO SESSION'}
        </span>
        <Link
          to="/history"
          className="font-display text-[10px] tracking-[0.2em] text-foreground hover:text-accent transition-colors"
        >
          {language === 'zh' ? '查看更多 →' : 'VIEW MORE →'}
        </Link>
      </div>
    </div>
  );
}
