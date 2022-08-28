/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CurrentConditions } from '../../model/current-conditions.model';
import { Day } from '../../model/day.model';
import { Hour } from '../../model/hour.model';
import { toCurrentConditionsMapper, toHoursForecastMapper, toNext10DaysForecastMapper } from './mappers';
import { WeatherApiService } from '../weather-api.service';

const API_KEY = 'KSFB4RN84XSRFBWTBHHW9359R';

type Options<T> = {
  url: string,
  include: string,
  mapper: (data: any) => T
}

/*
 * resource: https://www.visualcrossing.com/
 * timeline api: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
 */
@Injectable()
export class VisualCrossingWeatherApiService implements WeatherApiService {
  constructor(private httpClient: HttpClient) {}

  currentConditions(city: string): Observable<CurrentConditions> {
    return this.doGet({
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today`,
      include: 'current',
      mapper: toCurrentConditionsMapper,
    });
  }

  hoursForecast(city: string): Observable<Hour[]> {
    return this.doGet({
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next1days`,
      include: 'hours',
      mapper: toHoursForecastMapper,
    });
  }

  next10DaysForecast(city: string): Observable<Day[]> {
    return this.doGet({
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next10days`,
      include: 'days',
      mapper: toNext10DaysForecastMapper,
    });
  }

  private doGet<T>(options: Options<T>): Observable<T> {
    const params = {
      key: API_KEY,
      unitGroup: 'metric',
      include: options.include
    };
    return this.httpClient.get(options.url, { params })
      .pipe(map(options.mapper));
  }

  getOrigin(): string {
    return 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services';
  }
}
