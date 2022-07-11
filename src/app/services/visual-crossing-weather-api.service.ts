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
@Injectable()
export class VisualCrossingWeatherApiService implements WeatherApiService {
  private static readonly API_KEY = 'KSFB4RN84XSRFBWTBHHW9359R';

  private static readonly TODAY_INDEX = 0;
  private static readonly NEXT_DAY_INDEX = 1;

  constructor(private httpClient: HttpClient) {
  }

  currentConditions(city: string): Observable<CurrentConditions> {
    return this.doGet({
      url: `/VisualCrossingWebServices/rest/services/timeline/${city}/today`,
      include: 'current',
      mapper: this.jsonToCurrentConditions
    });
  }

  hoursForecast(city: string): Observable<Hour[]> {
    return this.doGet({
      url: `/VisualCrossingWebServices/rest/services/timeline/${city}/next1days`,
      include: 'hours',
      mapper: this.jsonToHoursForecast
    });
  }

  next10DaysForecast(city: string): Observable<Day[]> {
    return this.doGet({
      url: `/VisualCrossingWebServices/rest/services/timeline/${city}/next10days`,
      include: 'days',
      mapper: this.jsonToDaysForecast
    });
  }

  private doGet<T>(options: { url: string, include: string, mapper: (data: any) => T }): Observable<T> {
    const params = {
      key: VisualCrossingWeatherApiService.API_KEY,
      unitGroup: 'metric',
      include: options.include
    };
    return this.httpClient.get(options.url, { params })
      .pipe(map(options.mapper));
  }

  private jsonToCurrentConditions(data: any): CurrentConditions {
    const today = data.days[VisualCrossingWeatherApiService.TODAY_INDEX];
    return {
      temp: data.currentConditions.temp,
      maxTemp: today.tempmax,
      minTemp: today.tempmin,
      description: today.description,
      decoration: VisualCrossingWeatherApiService.decorationAdapter[data.currentConditions.icon],
      icon: data.currentConditions.icon,
      timezone: { timezone: data.timezone, offset: data.tzoffset },
    };
  }

  private jsonToHoursForecast(data: any): Hour[] {
    return data.days.flatMap((d: any) => d.hours)
      .map((h: any): Hour => ({
        time: h.datetime.slice(0, -3),
        temp: h.temp,
        icon: h.icon
      }));
  }

  private jsonToDaysForecast(data: any): Day[] {
    const days = data.days.slice(VisualCrossingWeatherApiService.NEXT_DAY_INDEX);
    return days.map((d: any): Day => ({
      date: d.datetime,
      icon: d.icon,
      minTemp: d.tempmin,
      maxTemp: d.tempmax
    }));
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
