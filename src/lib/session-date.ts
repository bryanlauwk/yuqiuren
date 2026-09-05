export function formatSessionDate(date: string, language: string, short = false) {
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-MY', {
    ...(short ? {} : { year: 'numeric' as const }),
    month: short && language === 'zh' ? 'numeric' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
