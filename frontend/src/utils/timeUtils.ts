const MS_PER_HOUR = 3600000;
const MS_PER_SECOND = 1000;
const HOURS_PER_DAY = 24;
const SEC_PER_MINUTE = 60;
const JUST_NOW_THRESHOLD = 5;

export const formatUpdateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const hours = Math.floor(diffMs / MS_PER_HOUR);

  if (hours >= HOURS_PER_DAY)
    return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);

  const seconds = Math.floor(diffMs / MS_PER_SECOND);
  const minutes = Math.floor(seconds / SEC_PER_MINUTE);

  if (hours >= 1) return hours === 1 ? "An hour ago" : `${hours} hours ago`;
  if (minutes >= 1)
    return minutes === 1 ? "A minute ago" : `${minutes} minutes ago`;
  if (seconds < JUST_NOW_THRESHOLD) return `Just now`;

  return `${seconds} seconds ago`;
};
