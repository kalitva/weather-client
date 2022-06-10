import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Weather } from '../model/weather';
import { WeatherApiService } from './weather-api.service';

/*
 * resource: https://www.visualcrossing.com/
 */
@Injectable()
export class VisualCrossingWeatherApiService implements WeatherApiService {
  private static readonly API_KEY = 'KSFB4RN84XSRFBWTBHHW9359R';

  constructor(private httpClient: HttpClient) {
  }

  forecast(city: string): Observable<Map<string, Weather[]>> {
    const url = `/VisualCrossingWebServices/rest/services/timeline/${city}/next10days`;
    const params = {
      key: VisualCrossingWeatherApiService.API_KEY,
      unitGroup: 'metric'
    };
    return this.httpClient.get(url, { params })
      .pipe(map(this.jsonToModel));
  }

  private jsonToModel(data: any): Map<string, Weather[]> {
    return data.days.reduce((m: Map<string, Weather[]> , d: any ) => {
      return m.set(d.datetime, d.hours.map((h: any) => ({
        description: h.conditions,
        cloudCover: h.cloudcover,
        temp: h.temp,
        feelsLike: h.feelslike,
        windSpeed: h.windspeed,
        humidity: h.humidity,
        pressure: h.pressure,
        precipeProbability: h.precipprob,
        precipeType: h.preciptype,
        uvIndex: h.uvindex
      })));
    }, new Map<string, Weather[]>());
  }
}
