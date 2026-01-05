-- Add columns for full avatar and crop positioning
ALTER TABLE public.players 
ADD COLUMN full_avatar_url text,
ADD COLUMN avatar_crop_x real DEFAULT 0.5,
ADD COLUMN avatar_crop_y real DEFAULT 0.5;