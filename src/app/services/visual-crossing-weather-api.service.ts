import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Decoration } from '../model/decoration.enum';
import { Weather } from '../model/weather.model';
import { WeatherApiService } from './weather-api.service';

/*
 * resource: https://www.visualcrossing.com/
 */
@Injectable()
export class VisualCrossingWeatherApiService implements WeatherApiService {
  private static readonly API_KEY = 'KSFB4RN84XSRFBWTBHHW9359R';

  constructor(private httpClient: HttpClient) {
  }

  forecast(city: string): Observable<Map<Date, Weather[]>> {
    const url = `/VisualCrossingWebServices/rest/services/timeline/${city}/next10days`;
    const params = {
      key: VisualCrossingWeatherApiService.API_KEY,
      unitGroup: 'metric'
    };
    return this.httpClient.get(url, { params })
      .pipe(map(this.jsonToModel));
  }

  private jsonToModel(data: any): Map<Date, Weather[]> {
    return data.days.reduce((m: Map<Date, Weather[]>, d: any) => {
      return m.set(new Date(d.datetime), d.hours.map((h: any): Weather => ({
        description: h.conditions,
        decoration: VisualCrossingWeatherApiService.decorationAdapter[h.icon],
        cloudCover: h.cloudcover,
        temp: h.temp,
        feelsLike: h.feelslike,
        windSpeed: h.windspeed,
        humidity: h.humidity,
        pressure: h.pressure,
        precipeProbability: h.precipprob,
        precipeType: h.preciptype,
        uvIndex: h.uvindex,
        windDirection: h.winddir
      })));
    }, new Map());
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
