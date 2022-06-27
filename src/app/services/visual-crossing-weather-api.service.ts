import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CurrentConditions } from '../model/current-conditions.model';
import { Hour } from '../model/hour.model';
import { WeatherApiService } from './weather-api.service';

/*
 * resource: https://www.visualcrossing.com/
 * timeline api: https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
 * icon set: https://www.visualcrossing.com/resources/documentation/weather-api/defining-icon-set-in-the-weather-api/
 */
@Injectable()
export class VisualCrossingWeatherApiService implements WeatherApiService {
  private static readonly API_KEY = 'KSFB4RN84XSRFBWTBHHW9359R';

  constructor(private httpClient: HttpClient) {
  }

  currentConditions(city: string): Observable<CurrentConditions> {
    const url = `/VisualCrossingWebServices/rest/services/timeline/${city}/today`;
    const params = {
      key: VisualCrossingWeatherApiService.API_KEY,
      unitGroup: 'metric',
      include: 'days'
    };
    return this.httpClient.get(url, { params })
      .pipe(map(this.jsonToCurrentConditions));
  }

  hoursForecast(city: string): Observable<Hour[]> {
    const url = `/VisualCrossingWebServices/rest/services/timeline/${city}/next1days`
    const params = {
      key: VisualCrossingWeatherApiService.API_KEY,
      unitGroup: 'metric',
      include: 'hours'
    };
    return this.httpClient.get(url, { params })
      .pipe(map(this.jsonToHoursForecast));
  }

  private jsonToCurrentConditions(data: any): CurrentConditions {
    const today = data.days[0];
    return {
      temp: today.temp,
      maxTemp: today.tempmax,
      minTemp: today.tempmin,
      description: today.description,
      decoration: today.icon,
    };
  }

  private jsonToHoursForecast(data: any): Hour[] {
    return data.days.flatMap((d: any) => d.hours)
      .map((h: any): Hour => ({
        time: h.datetime.slice(0, -3),
        temp: h.temp,
        decoration: h.icon
      }));
  }
}
