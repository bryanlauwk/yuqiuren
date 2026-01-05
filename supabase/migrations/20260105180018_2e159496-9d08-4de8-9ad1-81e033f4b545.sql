-- Drop public write policies that allow anyone to modify session results
DROP POLICY IF EXISTS "Anyone can insert session results" ON public.session_results;
DROP POLICY IF EXISTS "Anyone can update session results" ON public.session_results;
DROP POLICY IF EXISTS "Anyone can delete session results" ON public.session_results;

-- Add admin-only write policies for session_results
CREATE POLICY "Admins can insert session results"
  ON public.session_results FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update session results"
  ON public.session_results FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete session results"
  ON public.session_results FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));