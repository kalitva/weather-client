import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { Weather } from './model/weather.model';
import { GeoLocationService } from './services/geo-location.service';
import { WeatherApiService } from './services/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private static readonly ISO_DATE_LENGTH = 10;

  city: string;
  forecast: Map<string, Weather[]>;
  // TODO extract to method?
  todayWeather: Weather[];
  backgroundImageClass: string;

  constructor (private apiService: WeatherApiService, private locationService: GeoLocationService) {
  }

  // TODO handle errors for calls to services
  ngOnInit(): void {
    this.locationService.detectCity()
      .pipe(mergeMap(c => this.apiService.forecast(this.city = c)))
      .subscribe(this.updateView);
  }

  private updateView = (forecast: Map<string, Weather[]>): void => {
    const today = new Date;
    this.forecast = forecast;
    this.todayWeather = this.forecast.get(today.toISOString().slice(0, AppComponent.ISO_DATE_LENGTH)) || [];
    this.backgroundImageClass = `bg-${this.todayWeather[today.getHours()].decoration}`;
  };
}
