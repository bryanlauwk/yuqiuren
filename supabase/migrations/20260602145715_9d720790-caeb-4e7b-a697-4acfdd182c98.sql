CREATE TABLE public.session_highlights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.tournament_sessions(id) ON DELETE CASCADE,
  youtube_url TEXT NOT NULL,
  title TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.session_highlights TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.session_highlights TO authenticated;
GRANT ALL ON public.session_highlights TO service_role;

ALTER TABLE public.session_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view session highlights"
ON public.session_highlights
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert session highlights"
ON public.session_highlights
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update session highlights"
ON public.session_highlights
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete session highlights"
ON public.session_highlights
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_session_highlights_session_id ON public.session_highlights(session_id);