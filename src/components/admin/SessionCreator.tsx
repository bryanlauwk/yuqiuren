import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays, Users, Plus, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TournamentSession, SessionType, Player } from '@/types/ranking';
import { cn } from '@/lib/utils';

interface SessionCreatorProps {
  players: Player[];
  onCreateSession: (date: string, type: SessionType, name?: string) => Promise<TournamentSession>;
  onRecordResults: (
    sessionId: string,
    sessionType: SessionType,
    champions: string[],
    runnerUps: string[],
    attendance: string[]
  ) => Promise<void>;
}

export function SessionCreator({ players, onCreateSession, onRecordResults }: SessionCreatorProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<'type' | 'details' | 'results'>('type');
  const [sessionType, setSessionType] = useState<SessionType | null>(null);
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionName, setSessionName] = useState('');
  const [createdSession, setCreatedSession] = useState<TournamentSession | null>(null);
  
  const [selectedChampions, setSelectedChampions] = useState<string[]>([]);
  const [selectedRunnerUps, setSelectedRunnerUps] = useState<string[]>([]);
  const [selectedAttendance, setSelectedAttendance] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectType = (type: SessionType) => {
    setSessionType(type);
    setStep('details');
  };

  const handleCreateSession = async () => {
    if (!sessionType) return;

    try {
      const session = await onCreateSession(sessionDate, sessionType, sessionName || undefined);
      setCreatedSession(session);
      setStep('results');
      toast.success(t.admin.sessionCreated);
    } catch (error) {
      toast.error('Failed to create session');
      console.error(error);
    }
  };

  const togglePlayer = (
    playerId: string,
    category: 'champion' | 'runner_up' | 'attendance'
  ) => {
    setSelectedChampions((prev) => prev.filter((id) => id !== playerId));
    setSelectedRunnerUps((prev) => prev.filter((id) => id !== playerId));
    setSelectedAttendance((prev) => prev.filter((id) => id !== playerId));

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

  const handleSubmitResults = async () => {
    if (!createdSession || !sessionType) return;

    if (selectedChampions.length === 0) {
      toast.error(t.admin.selectChampion);
      return;
    }

    setIsSubmitting(true);
    try {
      await onRecordResults(
        createdSession.id,
        sessionType,
        selectedChampions,
        selectedRunnerUps,
        selectedAttendance
      );
      toast.success(t.admin.resultsRecorded);
      
      setStep('type');
      setSessionType(null);
      setCreatedSession(null);
      setSelectedChampions([]);
      setSelectedRunnerUps([]);
      setSelectedAttendance([]);
      setSessionName('');
    } catch (error) {
      toast.error('Failed to record results');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep('type');
    setSessionType(null);
    setCreatedSession(null);
    setSelectedChampions([]);
    setSelectedRunnerUps([]);
    setSelectedAttendance([]);
    setSessionName('');
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{t.admin.newSession}</h2>
            <p className="text-xs text-muted-foreground">{t.admin.createAndRecord}</p>
          </div>
        </div>
        {step !== 'type' && (
          <Button variant="ghost" size="sm" onClick={resetForm} className="text-muted-foreground">
            {t.admin.cancel}
          </Button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-6">
        {['type', 'details', 'results'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
              step === s ? 'bg-primary text-primary-foreground' : 
              (['type', 'details', 'results'].indexOf(step) > i) ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
            )}>
              {i + 1}
            </div>
            {i < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Session Type */}
      {step === 'type' && (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSelectType('3_teams')}
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5 text-primary" />
              <Users className="w-5 h-5 text-primary" />
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground group-hover:text-primary">{t.admin.threeTeams}</span>
            <span className="text-xs text-muted-foreground text-center">
              {t.admin.champion} (3) • {t.admin.runnerUp} (2) • {t.admin.attendance} (1)
            </span>
          </button>
          <button
            onClick={() => handleSelectType('2_teams')}
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5 text-primary" />
              <Users className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground group-hover:text-primary">{t.admin.twoTeams}</span>
            <span className="text-xs text-muted-foreground text-center">
              {t.admin.champion} (2) • {t.admin.runnerUp} (1)
            </span>
          </button>
        </div>
      )}

      {/* Step 2: Session Details */}
      {step === 'details' && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <CalendarDays className="w-4 h-4" />
            <span>{t.admin.sessionType}: <span className="text-foreground font-medium">{sessionType === '3_teams' ? t.admin.threeTeams : t.admin.twoTeams}</span></span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="session-date" className="text-sm font-medium">{t.admin.date}</Label>
            <Input
              id="session-date"
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="session-name" className="text-sm font-medium">{t.admin.nameOptional}</Label>
            <Input
              id="session-name"
              placeholder="e.g., Weekly Tournament #5"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>

          <Button onClick={handleCreateSession} className="w-full h-11 rounded-xl">
            {t.admin.continueToResults}
          </Button>
        </div>
      )}

      {/* Step 3: Assign Results */}
      {step === 'results' && sessionType && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            {t.admin.tapToCycle} <span className="text-champion font-medium">{t.admin.champion}</span> → <span className="text-runner-up font-medium">{t.admin.runnerUp}</span> {sessionType === '3_teams' && <span>→ <span className="text-attendance font-medium">{t.admin.attendance}</span></span>}
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
                      setSelectedChampions((prev) => prev.filter((id) => id !== player.id));
                      setSelectedRunnerUps((prev) => prev.filter((id) => id !== player.id));
                      setSelectedAttendance((prev) => prev.filter((id) => id !== player.id));
                    }
                  }}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-xl border-2 transition-all',
                    !category && 'border-border bg-background hover:border-muted-foreground',
                    category === 'champion' && 'border-champion bg-champion/10 text-champion',
                    category === 'runner_up' && 'border-runner-up bg-runner-up/10 text-runner-up',
                    category === 'attendance' && 'border-attendance bg-attendance/10 text-attendance'
                  )}
                >
                  <span className="font-medium">{player.name}</span>
                  {category && (
                    <span className="text-xs uppercase tracking-wide font-medium">
                      {category === 'champion' && `${t.admin.champion} (${sessionType === '3_teams' ? '3' : '2'}${t.admin.pts})`}
                      {category === 'runner_up' && `${t.admin.runnerUp} (${sessionType === '3_teams' ? '2' : '1'}${t.admin.pt})`}
                      {category === 'attendance' && `${t.admin.attendance} (1${t.admin.pt})`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-border text-sm">
            <span className="text-champion font-medium">{selectedChampions.length} {t.admin.champions}</span>
            <span className="text-runner-up font-medium">{selectedRunnerUps.length} {t.admin.runnerUps}</span>
            {sessionType === '3_teams' && (
              <span className="text-attendance font-medium">{selectedAttendance.length} {t.admin.attendance}</span>
            )}
          </div>

          <Button
            onClick={handleSubmitResults}
            className="w-full h-11 rounded-xl"
            disabled={isSubmitting || selectedChampions.length === 0}
          >
            {isSubmitting ? t.admin.saving : t.admin.saveResults}
          </Button>
        </div>
      )}
    </div>
  );
}