/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CurrentConditions } from '../model/current-conditions.model';
import { Day } from '../model/day.model';
import { Decoration } from '../model/decoration.enum';
import { Hour } from '../model/hour.model';
import { WeatherApiService } from './weather-api.service';

/*
 * resource: https://www.visualcrossing.com/
 * timeline api: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
 */

interface Options<T> {
  url: string,
  include: string,
  mapper: (data: any) => T
}

@Injectable()
export class VisualCrossingWeatherApiService implements WeatherApiService {
  private static readonly API_KEY = 'KSFB4RN84XSRFBWTBHHW9359R';

  private static readonly TODAY_INDEX = 0;
  private static readonly NEXT_DAY_INDEX = 1;

  constructor(private httpClient: HttpClient) {
  }

  currentConditions(city: string): Observable<CurrentConditions> {
    return this.doGet({
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today`,
      include: 'current',
      mapper: this.toCurrentConditionsMapper
    });
  }

  hoursForecast(city: string): Observable<Hour[]> {
    return this.doGet({
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next1days`,
      include: 'hours',
      mapper: data => data.days.flatMap((d: any) => d.hours)
        .map((h: any): Hour => ({
          time: h.datetime.slice(0, -3), // cut seconds
          temp: h.temp,
          icon: h.icon
        }))
    });
  }

  next10DaysForecast(city: string): Observable<Day[]> {
    return this.doGet({
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next10days`,
      include: 'days',
      mapper: data => data.days.slice(VisualCrossingWeatherApiService.NEXT_DAY_INDEX)
        .map((d: any): Day => ({
          date: d.datetime,
          icon: d.icon,
          minTemp: d.tempmin,
          maxTemp: d.tempmax
        }))
    });
  }

  private doGet<T>(options: Options<T>): Observable<T> {
    const params = {
      key: VisualCrossingWeatherApiService.API_KEY,
      unitGroup: 'metric',
      include: options.include
    };
    return this.httpClient.get(options.url, { params })
      .pipe(map(options.mapper));
  }

  private toCurrentConditionsMapper(data: any): CurrentConditions {
    const today = data.days[VisualCrossingWeatherApiService.TODAY_INDEX];
    return {
      address: data.address,
      summary: data.currentConditions.conditions,
      temp: data.currentConditions.temp,
      maxTemp: today.tempmax,
      minTemp: today.tempmin,
      feelsLike: data.currentConditions.feelslike,
      description: today.description,
      decoration: VisualCrossingWeatherApiService.decorationAdapter[data.currentConditions.icon],
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
  private static readonly decorationAdapter: { [key: string]: Decoration } = {
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
}
