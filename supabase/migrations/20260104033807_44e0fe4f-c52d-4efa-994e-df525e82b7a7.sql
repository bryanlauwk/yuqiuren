-- Fix PUBLIC_DATA_EXPOSURE: Restrict tournament_sessions write access to admins only

-- Drop public write policies on tournament_sessions
DROP POLICY IF EXISTS "Anyone can insert tournament sessions" ON public.tournament_sessions;
DROP POLICY IF EXISTS "Anyone can update tournament sessions" ON public.tournament_sessions;
DROP POLICY IF EXISTS "Anyone can delete tournament sessions" ON public.tournament_sessions;

-- Add admin-only write policies on tournament_sessions
CREATE POLICY "Admins can insert tournament sessions"
ON public.tournament_sessions FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update tournament sessions"
ON public.tournament_sessions FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete tournament sessions"
ON public.tournament_sessions FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));


-- Fix STORAGE_EXPOSURE: Restrict avatars bucket write access to admins only

-- Drop public write policies on storage.objects for avatars bucket
DROP POLICY IF EXISTS "Anyone can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete avatars" ON storage.objects;

-- Add admin-only write policies on storage.objects for avatars bucket
CREATE POLICY "Admins can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND 
  public.has_role(auth.uid(), 'admin')
);