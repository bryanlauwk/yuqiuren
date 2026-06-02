import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { SessionHighlight } from '@/types/ranking';

export function useAllHighlights() {
  const [highlights, setHighlights] = useState<SessionHighlight[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('session_highlights')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (data) setHighlights(data as SessionHighlight[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
    const channel = supabase
      .channel('session_highlights-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'session_highlights' },
        fetchAll,
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAll]);

  return { highlights, loading, refetch: fetchAll };
}

export function useSessionHighlights(sessionId: string | null) {
  const [highlights, setHighlights] = useState<SessionHighlight[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOne = useCallback(async () => {
    if (!sessionId) {
      setHighlights([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('session_highlights')
      .select('*')
      .eq('session_id', sessionId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (data) setHighlights(data as SessionHighlight[]);
    setLoading(false);
  }, [sessionId]);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  const addHighlight = async (youtubeUrl: string, title: string | null) => {
    if (!sessionId) return;
    const nextOrder = highlights.length;
    const { error } = await supabase.from('session_highlights').insert({
      session_id: sessionId,
      youtube_url: youtubeUrl,
      title,
      sort_order: nextOrder,
    });
    if (error) throw error;
    await fetchOne();
  };

  const deleteHighlight = async (id: string) => {
    const { error } = await supabase.from('session_highlights').delete().eq('id', id);
    if (error) throw error;
    await fetchOne();
  };

  const reorderHighlight = async (id: string, newSortOrder: number) => {
    const { error } = await supabase
      .from('session_highlights')
      .update({ sort_order: newSortOrder })
      .eq('id', id);
    if (error) throw error;
    await fetchOne();
  };

  return { highlights, loading, addHighlight, deleteHighlight, reorderHighlight, refetch: fetchOne };
}
