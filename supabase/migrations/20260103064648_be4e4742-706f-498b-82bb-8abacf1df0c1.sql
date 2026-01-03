-- Create players table
CREATE TABLE public.players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tournament_sessions table
CREATE TABLE public.tournament_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_date DATE NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('3_teams', '2_teams')),
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create session_results table
CREATE TABLE public.session_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.tournament_sessions(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  result_type TEXT NOT NULL CHECK (result_type IN ('champion', 'runner_up', 'attendance')),
  base_points INTEGER NOT NULL,
  streak_bonus INTEGER NOT NULL DEFAULT 0,
  total_points INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_results ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Anyone can view players"
  ON public.players FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view tournament sessions"
  ON public.tournament_sessions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view session results"
  ON public.session_results FOR SELECT
  USING (true);

-- Public write access for admin functionality (no auth for now)
CREATE POLICY "Anyone can insert players"
  ON public.players FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update players"
  ON public.players FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete players"
  ON public.players FOR DELETE
  USING (true);

CREATE POLICY "Anyone can insert tournament sessions"
  ON public.tournament_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update tournament sessions"
  ON public.tournament_sessions FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete tournament sessions"
  ON public.tournament_sessions FOR DELETE
  USING (true);

CREATE POLICY "Anyone can insert session results"
  ON public.session_results FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update session results"
  ON public.session_results FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete session results"
  ON public.session_results FOR DELETE
  USING (true);

-- Create index for efficient ranking queries
CREATE INDEX idx_session_results_player_id ON public.session_results(player_id);
CREATE INDEX idx_session_results_session_id ON public.session_results(session_id);
CREATE INDEX idx_tournament_sessions_date ON public.tournament_sessions(session_date DESC);

-- Enable realtime for ranking updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.players;
ALTER PUBLICATION supabase_realtime ADD TABLE public.session_results;