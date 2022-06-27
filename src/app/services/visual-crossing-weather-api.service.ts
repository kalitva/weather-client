import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CurrentConditions } from '../model/current-conditions.model';
import { Decoration } from '../model/decoration.enum';
import { Hour } from '../model/hour.model';
import { WeatherApiService } from './weather-api.service';

/*
 * resource: https://www.visualcrossing.com/
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
      unitGroup: 'metric'
    };
    return this.httpClient.get(url, { params })
      .pipe(map(this.jsonToCurrentConditions));
  }

  private jsonToCurrentConditions(data: any): CurrentConditions {
    const today = data.days[0];
    return {
      description: today.description,
      decoration: VisualCrossingWeatherApiService.decorationAdapter[today.icon],
      hours: today.hours.map((h: any): Hour => ({
        time: h.datetime.slice(0, -3),
        temp: h.temp,
        decoration: VisualCrossingWeatherApiService.decorationAdapter[h.icon]
      }))
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
    'partly-cloudy-day': Decoration.PARTLY_CLOUDY,
    'partly-cloudy-night': Decoration.PARTLY_CLOUDY,
    'clear-day': Decoration.CLEAR,
    'clear-night': Decoration.CLEAR
  };
}
