import { Component } from '@angular/core';
import { timeOfDay } from './logic/util';
import { CurrentConditions } from './model/current-conditions.model';
import { WeatherApiService } from './services/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  city: string;
  currentConditions: CurrentConditions;
  backgroundImagePath: string;
  visorColorClass: string;

  constructor (private weatherApiService: WeatherApiService) {
  }

  updateWeather(city: string): void {
    this.city = city;
    // TODO handle errors
    this.weatherApiService.currentConditions(city).subscribe(this.updateView);
  }

  private updateView = (currentConditions: CurrentConditions): void => {
    this.currentConditions = currentConditions;
    // TODO cut images at the bottom
    this.backgroundImagePath = `url(assets/bg/${timeOfDay()}/${currentConditions.decoration}.jpg)`;
    this.visorColorClass = `visor-color-${currentConditions.decoration}`;
  };
  // NOTE: it makes sense to emit conditions to set background instead of passing them to the child
}
