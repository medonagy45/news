export const getDateString = (date: string | null): string => {
  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  } as const;

  return date
    ? new Date(Date.parse(date)).toLocaleDateString(undefined, dateOptions)
    : '';
};
