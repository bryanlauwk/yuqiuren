import { useState, useEffect } from 'react';

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

export function NextMatchCountdown() {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    return getNextMonday9pm().getTime() - Date.now();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getNextMonday9pm().getTime() - Date.now();
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-2xl font-display text-primary tabular-nums">
      {formatCountdown(timeLeft)}
    </p>
  );
}
