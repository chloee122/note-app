const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60000;
const MS_PER_HOUR = 3600000;
const HOURS_PER_DAY = 24;
const JUST_NOW_THRESHOLD = 5;

export const formatUpdateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const diffMs = Math.max(Date.now() - date.getTime(), 0);
  const hours = Math.floor(diffMs / MS_PER_HOUR);

  if (hours >= HOURS_PER_DAY)
    return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);

  const minutes = Math.floor(diffMs / MS_PER_MINUTE);
  const seconds = Math.floor(diffMs / MS_PER_SECOND);

  if (hours >= 1) return hours === 1 ? "An hour ago" : `${hours} hours ago`;
  if (minutes >= 1)
    return minutes === 1 ? "A minute ago" : `${minutes} minutes ago`;
  if (seconds < JUST_NOW_THRESHOLD) return `Just now`;

  return `${seconds} seconds ago`;
};
