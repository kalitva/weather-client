import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Weather } from '../model/weather';
import { WeatherApiService } from './weather-api.service';

@Injectable()
export class VisualCrossingWeatherApiService implements WeatherApiService {
  // TODO extract to config
  private static readonly API_KEY = 'KSFB4RN84XSRFBWTBHHW9359R';
  private static readonly ISO_TIME_PART_LENGTH = 10;

  constructor(private httpClient: HttpClient) {
  }

  public getWeather(city: string, day: Date): Observable<Weather[]> {
    const isoDate = day.toISOString().slice(0, VisualCrossingWeatherApiService.ISO_TIME_PART_LENGTH);
    // TODO configure base url - https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${isoDate}`;
    const params = new HttpParams()
      .append('key', VisualCrossingWeatherApiService.API_KEY);
    return this.httpClient.get(url, { params })
      .pipe(map(this.jsonToModel));
  }

  private jsonToModel(data: any): Weather[] {
    return data.days[0].hours.map((h: any) => ({
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
    }));
  }
}
