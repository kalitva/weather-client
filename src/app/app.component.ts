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
  todayWeather: Weather[];
  backgroundImageClass: string;
  visorColorClass: string;

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
    // TODO error with wrong date
    this.todayWeather = this.forecast.get(today.toISOString().slice(0, AppComponent.ISO_DATE_LENGTH)) || [];
    const decoration = this.todayWeather[today.getHours()].decoration;
    this.backgroundImageClass = `bg-${decoration}`;
    this.visorColorClass = `visor-color-${decoration}`;
  };
}
