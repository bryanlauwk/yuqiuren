-- Drop public write policies on players table
DROP POLICY IF EXISTS "Anyone can insert players" ON public.players;
DROP POLICY IF EXISTS "Anyone can update players" ON public.players;
DROP POLICY IF EXISTS "Anyone can delete players" ON public.players;

-- Create admin-only write policies
CREATE POLICY "Admins can insert players"
ON public.players FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update players"
ON public.players FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete players"
ON public.players FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));