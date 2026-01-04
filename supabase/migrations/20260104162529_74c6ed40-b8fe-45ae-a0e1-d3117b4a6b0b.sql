-- Add group_photo_url column to tournament_sessions
ALTER TABLE public.tournament_sessions 
ADD COLUMN group_photo_url TEXT DEFAULT NULL;

-- Create storage bucket for session photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('session-photos', 'session-photos', true);

-- Public can view session photos
CREATE POLICY "Public can view session photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'session-photos');

-- Only admins can upload session photos
CREATE POLICY "Admins can upload session photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'session-photos' AND public.has_role(auth.uid(), 'admin'));

-- Only admins can update session photos
CREATE POLICY "Admins can update session photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'session-photos' AND public.has_role(auth.uid(), 'admin'));

-- Only admins can delete session photos
CREATE POLICY "Admins can delete session photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'session-photos' AND public.has_role(auth.uid(), 'admin'));