import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Trash2, Users, Camera, Loader2, Pencil, Check, X, Move } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { AvatarCropEditor } from '@/components/AvatarCropEditor';
import type { Player } from '@/types/ranking';

interface PlayerManagerProps {
  players: Player[];
  onAddPlayer: (name: string) => Promise<void>;
  onDeletePlayer: (id: string) => Promise<void>;
  onUpdateAvatar: (playerId: string, avatarUrl: string | null, fullAvatarUrl?: string | null) => Promise<void>;
  onUpdateName: (playerId: string, name: string) => Promise<void>;
  onUpdateAvatarCrop: (playerId: string, cropX: number, cropY: number) => Promise<void>;
}

export function PlayerManager({ players, onAddPlayer, onDeletePlayer, onUpdateAvatar, onUpdateName, onUpdateAvatarCrop }: PlayerManagerProps) {
  const { t } = useLanguage();
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [uploadingPlayerId, setUploadingPlayerId] = useState<string | null>(null);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const fileInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  
  // Crop editor state
  const [cropEditorPlayer, setCropEditorPlayer] = useState<Player | null>(null);
  const [pendingUpload, setPendingUpload] = useState<{
    playerId: string;
    fullImageUrl: string;
    croppedImageUrl: string;
  } | null>(null);

  const handleAddPlayer = async () => {
    if (!newPlayerName.trim()) {
      toast.error(t.admin.pleaseEnterName);
      return;
    }

    setIsAdding(true);
    try {
      await onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
      toast.success(t.admin.playerAdded);
    } catch (error) {
      toast.error('Failed to add player');
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeletePlayer = async (id: string, name: string) => {
    if (!confirm(`${t.admin.deleteConfirmTitle} "${name}"${t.admin.deleteConfirmMessage}`)) {
      return;
    }

    try {
      await onDeletePlayer(id);
      toast.success(t.admin.playerDeleted);
    } catch (error) {
      toast.error('Failed to delete player');
      console.error(error);
    }
  };

  const handleAvatarClick = (player: Player) => {
    // If player already has a full avatar, show crop editor
    if (player.full_avatar_url) {
      setCropEditorPlayer(player);
    } else {
      // Otherwise trigger file upload
      const input = fileInputRefs.current.get(player.id);
      if (input) {
        input.click();
      }
    }
  };

  const handleUploadNewAvatar = (playerId: string) => {
    const input = fileInputRefs.current.get(playerId);
    if (input) {
      input.click();
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const resizeImage = async (imageBase64: string, maxSize: number = 1024): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Calculate dimensions to maintain aspect ratio
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create blob'));
          },
          'image/jpeg',
          0.9
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageBase64;
    });
  };

  const handleFileSelect = async (playerId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be less than 10MB');
      return;
    }

    setUploadingPlayerId(playerId);
    const loadingToast = toast.loading('Uploading image...');

    try {
      const imageBase64 = await fileToBase64(file);
      
      // Resize image for storage (max 1024px)
      const resizedBlob = await resizeImage(imageBase64, 1024);
      
      // Upload full image
      const fullFileName = `${playerId}-full-${Date.now()}.jpg`;
      const fullFilePath = `players/${fullFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fullFilePath, resizedBlob, { upsert: true, contentType: 'image/jpeg' });

      if (uploadError) throw uploadError;

      const { data: fullUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fullFilePath);

      toast.dismiss(loadingToast);
      
      // Update avatar with full image and show crop editor
      await onUpdateAvatar(playerId, fullUrlData.publicUrl, fullUrlData.publicUrl);
      
      // Set pending upload for crop editor
      const player = players.find(p => p.id === playerId);
      if (player) {
        setCropEditorPlayer({
          ...player,
          full_avatar_url: fullUrlData.publicUrl,
          avatar_url: fullUrlData.publicUrl,
          avatar_crop_x: 0.5,
          avatar_crop_y: 0.5,
        });
      }
      
      toast.success(t.admin.avatarUpdated);
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to upload avatar');
    } finally {
      setUploadingPlayerId(null);
    }
  };

  const handleCropSave = async (cropX: number, cropY: number) => {
    if (!cropEditorPlayer) return;
    
    try {
      await onUpdateAvatarCrop(cropEditorPlayer.id, cropX, cropY);
      toast.success(t.admin.avatarUpdated);
    } catch (error) {
      console.error('Failed to save crop:', error);
      toast.error('Failed to save crop position');
    } finally {
      setCropEditorPlayer(null);
    }
  };

  const handleCropCancel = () => {
    setCropEditorPlayer(null);
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
      toast.error(t.admin.nameCannotBeEmpty);
      return;
    }

    try {
      await onUpdateName(playerId, editingName.trim());
      toast.success(t.admin.nameUpdated);
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
    <>
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-chart-4/10">
            <Users className="w-5 h-5 text-chart-4" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{t.admin.managePlayers}</h2>
            <p className="text-xs text-muted-foreground">{players.length} {t.admin.playersRegistered}</p>
          </div>
        </div>

        {/* Add Player Form */}
        <div className="flex gap-2 mb-6">
          <Input
            placeholder={t.admin.enterPlayerName}
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
            className="flex-1 h-11 rounded-xl bg-background"
          />
          <Button onClick={handleAddPlayer} disabled={isAdding} className="h-11 px-4 rounded-xl">
            <UserPlus className="w-4 h-4 mr-2" />
            {t.admin.add}
          </Button>
        </div>

        {/* Player Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-h-[400px] overflow-y-auto pr-2">
          {players.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">{t.admin.noPlayersYet}</p>
              <p className="text-sm text-muted-foreground/70">{t.admin.addFirstPlayer}</p>
            </div>
          ) : (
            players.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/50 hover:border-border transition-colors group"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <button
                    onClick={() => handleAvatarClick(player)}
                    disabled={uploadingPlayerId === player.id}
                    className="relative w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center overflow-hidden hover:border-primary transition-colors"
                  >
                    {uploadingPlayerId === player.id ? (
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    ) : player.avatar_url ? (
                      <>
                        <img
                          src={player.full_avatar_url || player.avatar_url}
                          alt={player.name}
                          className="w-full h-full object-cover"
                          style={{
                            objectPosition: player.avatar_crop_x !== null && player.avatar_crop_y !== null
                              ? `${player.avatar_crop_x * 100}% ${player.avatar_crop_y * 100}%`
                              : 'center'
                          }}
                        />
                        <div className="absolute inset-0 bg-background/80 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Move className="w-5 h-5 text-primary" />
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
                  
                  {/* Small upload button overlay when avatar exists */}
                  {player.full_avatar_url && (
                    <button
                      onClick={() => handleUploadNewAvatar(player.id)}
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm"
                      title="Upload new photo"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                  )}
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={(el) => {
                    if (el) fileInputRefs.current.set(player.id, el);
                  }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(player.id, file);
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

      {/* Crop Editor Modal */}
      {cropEditorPlayer && cropEditorPlayer.full_avatar_url && (
        <AvatarCropEditor
          fullImageUrl={cropEditorPlayer.full_avatar_url}
          initialCropX={cropEditorPlayer.avatar_crop_x ?? 0.5}
          initialCropY={cropEditorPlayer.avatar_crop_y ?? 0.5}
          onSave={handleCropSave}
          onCancel={handleCropCancel}
        />
      )}
    </>
  );
}