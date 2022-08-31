import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WeatherApiService } from './services/weather-api.service';
import { LoadingStateManager } from './state/loading-state-manager';
import { ObservableCity } from './state/observable-city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  weatherBeingLoaded: boolean;

  constructor(
    private observableCity: ObservableCity,
    private title: Title,
    private weatherService: WeatherApiService,
    private loadingStateManager: LoadingStateManager,
  ) {
    this.weatherBeingLoaded = true;
  }

  ngOnInit(): void {
    this.observableCity.onChange(c => this.title.setTitle(`Weather – ${c}`));
    this.loadingStateManager.getStateByKey(this.weatherService.getOrigin())
      .onChange(bl => this.weatherBeingLoaded = bl);
  }
}
