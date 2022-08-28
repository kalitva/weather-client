import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WeatherApiService } from './services/weather-api.service';
import { LoadingStateManager } from './state/loading-state-manager';
import { ObservableCity } from './state/observable-city';
import { State } from './state/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  weatherBeingLoaded: boolean;

  private readonly weatherLoadingState: State<boolean>;

  constructor(
    private observableCity: ObservableCity,
    private title: Title,
    weatherService: WeatherApiService,
    loadingStateManager: LoadingStateManager,
  ) {
    this.weatherBeingLoaded = true;
    this.weatherLoadingState = loadingStateManager.getStateByKey(weatherService.getOrigin());
  }

  ngOnInit(): void {
    this.observableCity.onChange(c => this.title.setTitle(`Weather – ${c}`));
    this.weatherLoadingState.onChange(bl => this.weatherBeingLoaded = bl);
  }
}
