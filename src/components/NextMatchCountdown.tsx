import { useState, useEffect, useCallback } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

function getNextMonday9pm(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate days until next Monday
  let daysUntilMonday = (1 - dayOfWeek + 7) % 7;
  
  // If it's Monday, check if 9pm has passed
  if (daysUntilMonday === 0) {
    const today9pm = new Date(now);
    today9pm.setHours(21, 0, 0, 0);
    if (now >= today9pm) {
      daysUntilMonday = 7; // Next Monday
    }
  }
  
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  nextMonday.setHours(21, 0, 0, 0);
  
  return nextMonday;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "Match starting!";
  
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }
  return `${hours}h ${minutes}m ${seconds}s`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function NextMatchCountdown() {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    return getNextMonday9pm().getTime() - Date.now();
  });
  const [nextMatch, setNextMatch] = useState<Date>(() => getNextMonday9pm());
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    return localStorage.getItem('matchNotifications') === 'true';
  });
  const [notificationSent, setNotificationSent] = useState(false);

  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      toast({
        title: "Notifications not supported",
        description: "Your browser doesn't support notifications.",
        variant: "destructive",
      });
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    toast({
      title: "Notifications blocked",
      description: "Please enable notifications in your browser settings.",
      variant: "destructive",
    });
    return false;
  }, []);

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      localStorage.setItem('matchNotifications', 'false');
      toast({
        title: "Notifications disabled",
        description: "You won't receive match reminders.",
      });
    } else {
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        localStorage.setItem('matchNotifications', 'true');
        toast({
          title: "Notifications enabled",
          description: "You'll be notified 1 hour before the match.",
        });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const matchDate = getNextMonday9pm();
      const remaining = matchDate.getTime() - Date.now();
      setTimeLeft(remaining);
      setNextMatch(matchDate);

      // Send notification 1 hour before match
      if (notificationsEnabled && !notificationSent && remaining <= 60 * 60 * 1000 && remaining > 0) {
        if (Notification.permission === 'granted') {
          new Notification('Match Starting Soon! 🏸', {
            body: 'Your badminton match starts in 1 hour at One Shamelin Badminton Hall.',
            icon: '/favicon.ico',
          });
          setNotificationSent(true);
        }
      }

      // Reset notification flag when match passes
      if (remaining <= 0) {
        setNotificationSent(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [notificationsEnabled, notificationSent]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-display text-primary tabular-nums">
          {formatCountdown(timeLeft)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleNotifications}
          title={notificationsEnabled ? "Disable notifications" : "Enable notifications"}
        >
          {notificationsEnabled ? (
            <Bell className="h-4 w-4 text-primary" />
          ) : (
            <BellOff className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        {formatDate(nextMatch)} • {formatTime(nextMatch)}
      </p>
    </div>
  );
}
