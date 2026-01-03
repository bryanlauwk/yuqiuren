import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Trash2, Users, Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { Player } from '@/types/ranking';

interface PlayerManagerProps {
  players: Player[];
  onAddPlayer: (name: string) => Promise<void>;
  onDeletePlayer: (id: string) => Promise<void>;
  onUpdateAvatar: (playerId: string, avatarUrl: string | null) => Promise<void>;
}

export function PlayerManager({ players, onAddPlayer, onDeletePlayer, onUpdateAvatar }: PlayerManagerProps) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [uploadingPlayerId, setUploadingPlayerId] = useState<string | null>(null);
  const fileInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const handleAddPlayer = async () => {
    if (!newPlayerName.trim()) {
      toast.error('Please enter a player name');
      return;
    }

    setIsAdding(true);
    try {
      await onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
      toast.success('Player added successfully');
    } catch (error) {
      toast.error('Failed to add player');
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeletePlayer = async (id: string, name: string) => {
    if (!confirm(`Delete player "${name}"? This will also remove all their results.`)) {
      return;
    }

    try {
      await onDeletePlayer(id);
      toast.success('Player deleted');
    } catch (error) {
      toast.error('Failed to delete player');
      console.error(error);
    }
  };

  const handleAvatarClick = (playerId: string) => {
    const input = fileInputRefs.current.get(playerId);
    if (input) {
      input.click();
    }
  };

  const handleAvatarUpload = async (playerId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    setUploadingPlayerId(playerId);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${playerId}-${Date.now()}.${fileExt}`;
      const filePath = `players/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await onUpdateAvatar(playerId, urlData.publicUrl);
      toast.success('Avatar updated');
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error('Failed to upload avatar');
    } finally {
      setUploadingPlayerId(null);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 glow-card">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h2 className="font-display text-lg tracking-wide text-glow-subtle">MANAGE PLAYERS</h2>
      </div>

      {/* Add Player Form */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter player name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
          className="flex-1 bg-background border-border"
        />
        <Button onClick={handleAddPlayer} disabled={isAdding} size="icon">
          <UserPlus className="w-4 h-4" />
        </Button>
      </div>

      {/* Player List */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {players.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No players yet</p>
        ) : (
          players.map((player) => (
            <div
              key={player.id}
              className="flex items-center gap-3 p-2 bg-muted/50 rounded-md"
            >
              {/* Avatar */}
              <button
                onClick={() => handleAvatarClick(player.id)}
                disabled={uploadingPlayerId === player.id}
                className="relative w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden hover:border-primary transition-colors group"
              >
                {uploadingPlayerId === player.id ? (
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                ) : player.avatar_url ? (
                  <>
                    <img
                      src={player.avatar_url}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-4 h-4 text-primary" />
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-medium text-muted-foreground group-hover:hidden">
                      {getInitials(player.name)}
                    </span>
                    <Camera className="w-4 h-4 text-primary hidden group-hover:block" />
                  </>
                )}
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={(el) => {
                  if (el) fileInputRefs.current.set(player.id, el);
                }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAvatarUpload(player.id, file);
                  e.target.value = '';
                }}
              />

              {/* Name */}
              <span className="flex-1 text-sm">{player.name}</span>

              {/* Delete */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => handleDeletePlayer(player.id, player.name)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
