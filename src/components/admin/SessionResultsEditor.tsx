import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { TournamentSession, SessionResult, SessionType, Player } from '@/types/ranking';
import { cn } from '@/lib/utils';

interface SessionResultsEditorProps {
  session: TournamentSession;
  results: SessionResult[];
  players: Player[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateResults: (
    sessionId: string,
    sessionType: SessionType,
    champions: string[],
    runnerUps: string[],
    attendance: string[]
  ) => Promise<void>;
}

export function SessionResultsEditor({
  session,
  results,
  players,
  open,
  onOpenChange,
  onUpdateResults,
}: SessionResultsEditorProps) {
  const sessionType = session.session_type as SessionType;
  
  // Initialize selections from existing results
  const getInitialSelections = () => {
    const champions = results.filter(r => r.result_type === 'champion').map(r => r.player_id);
    const runnerUps = results.filter(r => r.result_type === 'runner_up').map(r => r.player_id);
    const attendance = results.filter(r => r.result_type === 'attendance').map(r => r.player_id);
    return { champions, runnerUps, attendance };
  };

  const initial = getInitialSelections();
  const [selectedChampions, setSelectedChampions] = useState<string[]>(initial.champions);
  const [selectedRunnerUps, setSelectedRunnerUps] = useState<string[]>(initial.runnerUps);
  const [selectedAttendance, setSelectedAttendance] = useState<string[]>(initial.attendance);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset to initial when dialog opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      const init = getInitialSelections();
      setSelectedChampions(init.champions);
      setSelectedRunnerUps(init.runnerUps);
      setSelectedAttendance(init.attendance);
    }
    onOpenChange(newOpen);
  };

  const togglePlayer = (
    playerId: string,
    category: 'champion' | 'runner_up' | 'attendance'
  ) => {
    // Remove from all categories first
    setSelectedChampions((prev) => prev.filter((id) => id !== playerId));
    setSelectedRunnerUps((prev) => prev.filter((id) => id !== playerId));
    setSelectedAttendance((prev) => prev.filter((id) => id !== playerId));

    // Add to selected category
    switch (category) {
      case 'champion':
        setSelectedChampions((prev) => [...prev, playerId]);
        break;
      case 'runner_up':
        setSelectedRunnerUps((prev) => [...prev, playerId]);
        break;
      case 'attendance':
        setSelectedAttendance((prev) => [...prev, playerId]);
        break;
    }
  };

  const getPlayerCategory = (playerId: string): 'champion' | 'runner_up' | 'attendance' | null => {
    if (selectedChampions.includes(playerId)) return 'champion';
    if (selectedRunnerUps.includes(playerId)) return 'runner_up';
    if (selectedAttendance.includes(playerId)) return 'attendance';
    return null;
  };

  const handleSubmit = async () => {
    if (selectedChampions.length === 0) {
      toast.error('Please select at least one champion');
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdateResults(
        session.id,
        sessionType,
        selectedChampions,
        selectedRunnerUps,
        selectedAttendance
      );
      toast.success('Results updated successfully!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to update results');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Session Results</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-xl">
            Tap a player to cycle through: <span className="text-champion font-medium">Champion</span> → <span className="text-runner-up font-medium">Runner-up</span> {sessionType === '3_teams' && <span>→ <span className="text-attendance font-medium">Attendance</span></span>}
          </p>

          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
            {players.map((player) => {
              const category = getPlayerCategory(player.id);
              return (
                <button
                  key={player.id}
                  onClick={() => {
                    if (!category) {
                      togglePlayer(player.id, 'champion');
                    } else if (category === 'champion') {
                      togglePlayer(player.id, 'runner_up');
                    } else if (category === 'runner_up' && sessionType === '3_teams') {
                      togglePlayer(player.id, 'attendance');
                    } else {
                      // Remove from all
                      setSelectedChampions((prev) => prev.filter((id) => id !== player.id));
                      setSelectedRunnerUps((prev) => prev.filter((id) => id !== player.id));
                      setSelectedAttendance((prev) => prev.filter((id) => id !== player.id));
                    }
                  }}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left',
                    !category && 'border-border bg-background hover:border-muted-foreground',
                    category === 'champion' && 'border-champion bg-champion/10 text-champion',
                    category === 'runner_up' && 'border-runner-up bg-runner-up/10 text-runner-up',
                    category === 'attendance' && 'border-attendance bg-attendance/10 text-attendance'
                  )}
                >
                  <span className="font-medium">{player.name}</span>
                  {category && (
                    <span className="text-xs uppercase tracking-wide font-medium">
                      {category === 'champion' && `Champion (${sessionType === '3_teams' ? '3' : '2'}pts)`}
                      {category === 'runner_up' && `Runner-up (${sessionType === '3_teams' ? '2' : '1'}pt)`}
                      {category === 'attendance' && 'Attendance (1pt)'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-border text-sm">
            <span className="text-champion font-medium">{selectedChampions.length} Champions</span>
            <span className="text-runner-up font-medium">{selectedRunnerUps.length} Runner-ups</span>
            {sessionType === '3_teams' && (
              <span className="text-attendance font-medium">{selectedAttendance.length} Attendance</span>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 h-11 rounded-xl"
              disabled={isSubmitting || selectedChampions.length === 0}
            >
              {isSubmitting ? 'Saving...' : 'Update Results'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
