export function timeOfDay(): string {
  // TODO should take hours as a parameter the time of day to be computed according to a time zone
  const hours = new Date().getHours();
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
