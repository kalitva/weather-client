import { HourWeather } from "./hour-weather";

export interface DayWeather {
  condition: string,
  cloudCover: number,       /*** percents ***/
  icon: string,
  temperature: number,      /*** celsius ***/
  feelsLike: number,
  windDirection: number,    /*** degree ***/
  windSpeed: number,        /*** km/h ***/
  humidity: number,
  pressure: number,         /*** milibars ***/
  hours: HourWeather[]
}

