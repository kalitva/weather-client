import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Weather } from '../model/weather';
import { WeatherApiService } from './weather-api.service';

@Injectable()
export class VisualCrossingWeatherApiService implements WeatherApiService {
  private static readonly API_KEY = 'KSFB4RN84XSRFBWTBHHW9359R';

  constructor(private httpClient: HttpClient) {
  }

  public forecast(city: string): Observable<Map<string, Weather[]>> {
    const params = { key: VisualCrossingWeatherApiService.API_KEY };
    return this.httpClient.get(`/VisualCrossingWebServices/rest/services/timeline/${city}/next10days`, { params })
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
