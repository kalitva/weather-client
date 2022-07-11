export function timeOfDayByOffset(offset: number): string {
  const hours = datetimeByOffset(offset).getHours();
  if (hours >= 22 || hours >= 0 && hours < 7) {
    return 'night';
  }
  if (hours >= 7 && hours < 11) {
    return 'morning';
  }
  if (hours >= 11 && hours < 19) {
    return 'day';
  }
  if (hours >= 19 && hours < 22) {
    return 'evening';
  }
  throw new Error('Should not be reached');
}

export function datetimeByOffset(offset: number): Date {
  const date = new Date(new Date().toISOString().slice(0, -1));
  date.setHours(date.getHours() + offset);
  return date;
}
