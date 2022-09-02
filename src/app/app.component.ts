import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import { GeolocationService } from './services/geolocation.service';
import { WeatherApiService } from './services/weather-api.service';
import { ErrorState } from './state/error-state';
import { LoadingStateManager } from './state/loading-state-manager';
import { ObservableCity } from './state/observable-city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('top_bar') topBar: TopBarComponent;

  weatherBeingLoaded: boolean;

  constructor(
    private observableCity: ObservableCity,
    private title: Title,
    private activatedRout: ActivatedRoute,
    private weatherService: WeatherApiService,
    private loadingStateManager: LoadingStateManager,
    private geolocationService: GeolocationService,
    private errorState: ErrorState,
  ) {
    this.weatherBeingLoaded = true;
  }

  ngOnInit(): void {
    this.tryToDetectCity();
    this.activatedRout.queryParams.subscribe(params => {
      const city = params['city'];
      if (city) {
        this.observableCity.update(city);
        this.title.setTitle(`Weather – ${city}`);
      }
    });
    this.loadingStateManager.getStateByKey(this.weatherService.getOrigin())
      .onChange(bl => this.weatherBeingLoaded = bl);
  }

  private tryToDetectCity(): void {
    const queryParams = new HttpParams({ fromString: window.location.search });
    if (queryParams.get('city')) { // if the url already contains a city param
      return;
    }
    this.geolocationService.detectCity().subscribe({
      next: c => this.topBar.navigateToCity(c),
      error: e => {
        this.errorState.riseError({
          problem: 'An error occured trying to detect your city:',
          message: e.message,
          advice: 'Please, press "another city" and type the city name you need'
        });
        this.topBar.navigateToCity(GeolocationService.DEFAULT_CITY);
      }
    });
  }
}
