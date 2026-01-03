import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Trash2, Users, Camera, Loader2, Pencil, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { Player } from '@/types/ranking';

interface PlayerManagerProps {
  players: Player[];
  onAddPlayer: (name: string) => Promise<void>;
  onDeletePlayer: (id: string) => Promise<void>;
  onUpdateAvatar: (playerId: string, avatarUrl: string | null) => Promise<void>;
  onUpdateName: (playerId: string, name: string) => Promise<void>;
}

export function PlayerManager({ players, onAddPlayer, onDeletePlayer, onUpdateAvatar, onUpdateName }: PlayerManagerProps) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [uploadingPlayerId, setUploadingPlayerId] = useState<string | null>(null);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
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

  const handleStartEdit = (player: Player) => {
    setEditingPlayerId(player.id);
    setEditingName(player.name);
  };

  const handleCancelEdit = () => {
    setEditingPlayerId(null);
    setEditingName('');
  };

  const handleSaveEdit = async (playerId: string) => {
    if (!editingName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    try {
      await onUpdateName(playerId, editingName.trim());
      toast.success('Name updated');
      setEditingPlayerId(null);
      setEditingName('');
    } catch (error) {
      toast.error('Failed to update name');
      console.error(error);
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
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-chart-4/10">
          <Users className="w-5 h-5 text-chart-4" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Manage Players</h2>
          <p className="text-xs text-muted-foreground">{players.length} players registered</p>
        </div>
      </div>

      {/* Add Player Form */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Enter player name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
          className="flex-1 h-11 rounded-xl bg-background"
        />
        <Button onClick={handleAddPlayer} disabled={isAdding} className="h-11 px-4 rounded-xl">
          <UserPlus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Player Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-h-[400px] overflow-y-auto pr-2">
        {players.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No players yet</p>
            <p className="text-sm text-muted-foreground/70">Add your first player above</p>
          </div>
        ) : (
          players.map((player) => (
            <div
              key={player.id}
              className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/50 hover:border-border transition-colors group"
            >
              {/* Avatar */}
              <button
                onClick={() => handleAvatarClick(player.id)}
                disabled={uploadingPlayerId === player.id}
                className="relative w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center overflow-hidden hover:border-primary transition-colors shrink-0"
              >
                {uploadingPlayerId === player.id ? (
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                ) : player.avatar_url ? (
                  <>
                    <img
                      src={player.avatar_url}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/80 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-5 h-5 text-primary" />
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-semibold text-muted-foreground group-hover:hidden">
                      {getInitials(player.name)}
                    </span>
                    <Camera className="w-5 h-5 text-primary hidden group-hover:block" />
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
              <div className="flex-1 min-w-0">
                {editingPlayerId === player.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(player.id);
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-primary hover:text-primary"
                      onClick={() => handleSaveEdit(player.id)}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                      onClick={handleCancelEdit}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="font-medium text-foreground truncate">{player.name}</p>
                )}
              </div>

              {/* Actions */}
              {editingPlayerId !== player.id && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => handleStartEdit(player)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeletePlayer(player.id, player.name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
