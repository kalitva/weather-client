import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { CurrentConditions } from './model/current-conditions.model';
import { GeolocationService } from './services/geolocation.service';
import { WeatherApiService } from './services/weather-api.service';
import { timeOfDay } from './util/timeOfDay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  city: string;
  currentConditions: CurrentConditions;
  backgroundImagePath: string;
  visorColorClass: string;

  constructor (private apiService: WeatherApiService, private locationService: GeolocationService) {
  }

  // TODO handle errors for calls to services
  ngOnInit(): void {
    // TODO doesn't work when browser asks to allow getting location
    this.locationService.detectCity()
      .pipe(mergeMap(c => this.apiService.currentConditions(this.city = c)))
      .subscribe(this.updateView);
  }

  private updateView = (currentConditions: CurrentConditions): void => {
    this.currentConditions = currentConditions;
    // TODO cut images at the bottom
    this.backgroundImagePath = `url(assets/bg/${timeOfDay()}/${currentConditions.decoration}.jpg)`;
    this.visorColorClass = `visor-color-${currentConditions.decoration}`;
  };
}
