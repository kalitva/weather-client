import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'
import { DayWeather } from '../model/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private static readonly API_KEY = '';

  constructor(private httpClient: HttpClient) {
  }

  public getWeather(city: string, day: Date): Observable<DayWeather> {
    return this.httpClient.get<DayWeather>('');
  }
}
