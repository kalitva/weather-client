export function timeOfDayByTimezoneOffset(offset: number): string {
  const hours = datetimeByTimezoneOffset(offset).getHours();
  if (hours >= 22 || hours >= 0 && hours < 6) {
    return 'night';
  }
  if (hours >= 6 && hours < 10) {
    return 'morning';
  }
  if (hours >= 10 && hours < 19) {
    return 'day';
  }
  if (hours >= 19 && hours < 22) {
    return 'evening';
  }
  throw new Error('Should not be reached');
}

export function datetimeByTimezoneOffset(offset: number): Date {
  const date = new Date(new Date().toISOString().slice(0, -1));
  date.setHours(date.getHours() + offset);
  return date;
}
