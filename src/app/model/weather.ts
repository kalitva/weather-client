import { Decoration } from './decoration';

export interface Weather {
  description: string;
  decoration: Decoration;
  cloudCover: number;                        /*** percents ***/
  temp: number;                              /*** celsius ***/
  feelsLike: number;
  windDirection: number;                     /*** degree ***/
  windSpeed: number;                         /*** km/h ***/
  humidity: number;
  pressure: number;                          /*** milibars ***/
  precipeProbability: string;                /*** percents ***/
  precipeType: string;
  uvIndex: number;
}
