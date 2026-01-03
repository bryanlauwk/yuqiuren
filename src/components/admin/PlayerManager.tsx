import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';
import type { Player } from '@/types/ranking';

interface PlayerManagerProps {
  players: Player[];
  onAddPlayer: (name: string) => Promise<void>;
  onDeletePlayer: (id: string) => Promise<void>;
}

export function PlayerManager({ players, onAddPlayer, onDeletePlayer }: PlayerManagerProps) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

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

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h2 className="font-display text-lg tracking-wide">MANAGE PLAYERS</h2>
      </div>

      {/* Add Player Form */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter player name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
          className="flex-1"
        />
        <Button onClick={handleAddPlayer} disabled={isAdding} size="icon">
          <UserPlus className="w-4 h-4" />
        </Button>
      </div>

      {/* Player List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {players.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No players yet</p>
        ) : (
          players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
            >
              <span className="text-sm">{player.name}</span>
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
