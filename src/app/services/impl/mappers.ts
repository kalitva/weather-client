/* eslint-disable @typescript-eslint/no-explicit-any */
import { CurrentConditions } from '../../model/current-conditions.model';
import { Day } from '../../model/day.model';
import { Decoration } from '../../model/decoration.enum';
import { Hour } from '../../model/hour.model';

const NEXT_DAY_INDEX = 1;
const TODAY_INDEX = 0;

export function toHoursForecastMapper(data: any): Hour[] {
  return data.days.flatMap((d: any) => d.hours)
    .map((h: any): Hour => ({
      time: h.datetime.slice(0, -3), // cut seconds
      temp: h.temp,
      icon: h.icon
    }));
}

export function toNext10DaysForecastMapper(data: any): Day[] {
  return data.days.slice(NEXT_DAY_INDEX)
    .map((d: any): Day => ({
      description: d.description,
      date: d.datetime,
      icon: d.icon,
      minTemp: d.tempmin,
      maxTemp: d.tempmax,
      feelsLike: d.feelslike,
      humidity: d.humidity,
      visibility: d.visibility,
      uvIndex: d.uvindex,
      windSpeed: d.windspeed,
      pressure: d.pressure,
    }));
}

export function toCurrentConditionsMapper(data: any): CurrentConditions {
  const today = data.days[TODAY_INDEX];
  return {
    address: data.address,
    summary: data.currentConditions.conditions,
    temp: data.currentConditions.temp,
    maxTemp: today.tempmax,
    minTemp: today.tempmin,
    feelsLike: data.currentConditions.feelslike,
    description: today.description,
    decoration: decorationAdapter[data.currentConditions.icon],
    icon: data.currentConditions.icon,
    timezone: { name: data.timezone, offset: data.tzoffset },
    windSpeed: data.currentConditions.windspeed,
    cloudCover: data.currentConditions.cloudcover,
    humidity: data.currentConditions.humidity,
    pressure: data.currentConditions.pressure,
    uvIndex: data.currentConditions.uvindex,
  };
}

/*
 * docs: https://www.visualcrossing.com/resources/documentation/weather-api/defining-icon-set-in-the-weather-api/
 */
const decorationAdapter: { [key: string]: Decoration } = {
  snow: Decoration.SNOW,
  rain: Decoration.RAIN,
  fog: Decoration.FOG,
  wind: Decoration.WIND,
  cloudy: Decoration.CLOUDY,
  'partly-cloudy-day': Decoration.CLOUDY,
  'partly-cloudy-night': Decoration.CLOUDY,
  'clear-day': Decoration.CLEAR,
  'clear-night': Decoration.CLEAR
};

