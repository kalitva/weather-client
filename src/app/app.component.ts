import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';
import { CurrentConditions } from './model/current-conditions.model';
import { Hour } from './model/hour.model';
import { GeolocationService } from './services/geolocation.service';
import { WeatherApiService } from './services/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  city: string;
  currentConditions: CurrentConditions;
  hours: Hour[];
  backgroundImageClass: string;
  visorColorClass: string;

  constructor (private apiService: WeatherApiService, private locationService: GeolocationService) {
  }

  // TODO handle errors for calls to services
  ngOnInit(): void {
    this.locationService.detectCity()
      .pipe(mergeMap(c => this.apiService.currentConditions(this.city = c)))
      .subscribe(this.updateView);
  }

  private updateView = (currentConditions: CurrentConditions): void => {
    this.currentConditions = currentConditions;
    this.hours = currentConditions.hours;
    // TODO cut images at the bottom
    this.backgroundImageClass = `bg-${currentConditions.decoration}`;
    this.visorColorClass = `visor-color-${currentConditions.decoration}`;
  };
}
