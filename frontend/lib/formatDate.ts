export function formatDate(isoDate: string, lang: string): string {
  const date = new Date(isoDate);

  // Error handling if invalid date
  if (isNaN(date.getTime())) return isoDate;

  // Convert to specific locales
  const locale = lang === 'hi' ? 'hi-IN' : 'en-US';

  // formatting options
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatTimeRelativeOrAbsolute(isoDate: string, lang: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return isoDate;

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours < 48) {
    if (diffInHours < 1) {
      return lang === 'hi' ? 'कुछ मिनट पहले' : 'Just now';
    }
    const hours = Math.floor(diffInHours);
    if (lang === 'hi') {
      return `${hours} ${hours === 1 ? 'घंटा' : 'घंटे'} पहले`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  return formatDate(isoDate, lang);
}
