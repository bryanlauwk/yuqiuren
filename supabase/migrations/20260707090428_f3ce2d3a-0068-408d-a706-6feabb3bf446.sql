
-- 1) Create private schema hidden from PostgREST
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

-- 2) Recreate has_role in private schema
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 3) Drop policies that depend on public.has_role, then recreate using private.has_role

-- players
DROP POLICY IF EXISTS "Admins can insert players" ON public.players;
DROP POLICY IF EXISTS "Admins can update players" ON public.players;
DROP POLICY IF EXISTS "Admins can delete players" ON public.players;
CREATE POLICY "Admins can insert players" ON public.players FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update players" ON public.players FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete players" ON public.players FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- tournament_sessions
DROP POLICY IF EXISTS "Admins can insert tournament sessions" ON public.tournament_sessions;
DROP POLICY IF EXISTS "Admins can update tournament sessions" ON public.tournament_sessions;
DROP POLICY IF EXISTS "Admins can delete tournament sessions" ON public.tournament_sessions;
CREATE POLICY "Admins can insert tournament sessions" ON public.tournament_sessions FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update tournament sessions" ON public.tournament_sessions FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete tournament sessions" ON public.tournament_sessions FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- session_results
DROP POLICY IF EXISTS "Admins can insert session results" ON public.session_results;
DROP POLICY IF EXISTS "Admins can update session results" ON public.session_results;
DROP POLICY IF EXISTS "Admins can delete session results" ON public.session_results;
CREATE POLICY "Admins can insert session results" ON public.session_results FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update session results" ON public.session_results FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete session results" ON public.session_results FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- session_highlights
DROP POLICY IF EXISTS "Admins can insert session highlights" ON public.session_highlights;
DROP POLICY IF EXISTS "Admins can update session highlights" ON public.session_highlights;
DROP POLICY IF EXISTS "Admins can delete session highlights" ON public.session_highlights;
CREATE POLICY "Admins can insert session highlights" ON public.session_highlights FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update session highlights" ON public.session_highlights FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete session highlights" ON public.session_highlights FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- user_roles
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- storage.objects admin policies
DROP POLICY IF EXISTS "Admins can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload session photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update session photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete session photos" ON storage.objects;
CREATE POLICY "Admins can upload avatars" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update avatars" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'avatars' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete avatars" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'avatars' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can upload session photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'session-photos' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update session photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'session-photos' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete session photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'session-photos' AND private.has_role(auth.uid(), 'admin'::public.app_role));

-- 4) Drop old public.has_role now that nothing references it
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 5) Remove broad SELECT policies allowing listing of storage buckets.
-- Public buckets remain fetchable via their public object URLs.
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Public can view session photos" ON storage.objects;
