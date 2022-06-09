import { WeatherBannerComponent } from './weather-banner.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-day-weather-banner[city, day]',
  templateUrl: './weather-banner.component.html',
  styleUrls: ['./weather-banner.component.css']
})
export class DayWeatherBannerComponent extends WeatherBannerComponent {
  @Input() day: string;

  public tempValue(): string {
    throw new Error('Method not implemented.');
  }

  public fromWhichHour(): number {
    throw new Error('Method not implemented.');
  }
}
