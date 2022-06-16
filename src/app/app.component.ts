import { ChangeDetectionStrategy, Component, OnInit, Renderer2 } from '@angular/core';
import { mergeMap } from 'rxjs';
import { Weather } from './model/weather.model';
import { GeoLocationService } from './services/geo-location.service';
import { WeatherApiService } from './services/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private static readonly ISO_DATE_LENGTH = 10;

  city: string;
  forecast: Map<string, Weather[]>;
  todayWeather: Weather[];
  contentLoaded: boolean;

  private today: Date;

  constructor(
    private apiService: WeatherApiService,
    private locationService: GeoLocationService,
    private renderer: Renderer2
  ) {}

  // TODO handle errors for calls to services
  ngOnInit(): void {
    this.locationService.detectCity()
      .pipe(mergeMap(c => this.apiService.forecast(this.city = c)))
      .subscribe(this.updateView);
  }

  private updateView = (forecast: Map<string, Weather[]>): void => {
    this.contentLoaded = false;
    this.today = new Date;
    this.forecast = forecast;
    this.todayWeather = this.forecast.get(this.today.toISOString().slice(0, AppComponent.ISO_DATE_LENGTH)) || [];
    const backgroundImageClass = `bg-${this.todayWeather[this.today.getHours()].decoration}`;
    this.renderer.addClass(document.getElementById('background-back'), backgroundImageClass);
    this.renderer.addClass(document.getElementById('background-front'), backgroundImageClass);
    this.contentLoaded = true;
    console.dir(this.forecast);
  };
}
