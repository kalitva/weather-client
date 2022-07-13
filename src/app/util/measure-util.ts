export function uvIndexScale(uvIndex: number): string {
  if (uvIndex >= 0 && uvIndex < 3) {
    return 'Low';
  }
  if (uvIndex >= 3 && uvIndex < 6) {
    return 'Moderate';
  }
  if (uvIndex >= 6 && uvIndex < 8) {
    return 'High';
  }
  if (uvIndex >= 8 && uvIndex < 11) {
    return 'Very high';
  }
  if (uvIndex > 10) {
    return 'Exterme';
  }
  throw new Error('Should not be reached');
}
