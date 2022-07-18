import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObservableCity } from 'src/app/state/observable-city';
import { datetimeByTimezoneOffset } from 'src/app/util/datetime-util';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ObservableCurrentConditions } from 'src/app/state/observable-current-conditions';
import { CurrentConditions } from 'src/app/model/current-conditions.model';
import { Title } from '@angular/platform-browser';
import { LoadingState } from 'src/app/state/loading-state';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  city: string;
  time: string;
  currentConditions: CurrentConditions;
  timezone: string;
  showForm: boolean;
  showError: boolean;
  errorMessage: string;
  beingLoaded: boolean;

  constructor(private geolocationService: GeolocationService,
              private router: Router,
              private activatedRout: ActivatedRoute,
              private title: Title,
              private loadingState: LoadingState,
              private observableCity: ObservableCity,
              private observableCurrentConditions: ObservableCurrentConditions) {
  }

  ngOnInit(): void {
    this.tryToDetectCity();
    this.activatedRout.queryParams.subscribe(this.updateCityByQueryParam);
    this.observableCurrentConditions.onChange(this.setCurrentConditionsData);
    this.loadingState.onChange(bl => this.beingLoaded = bl);
  }

  navigateToCity = (city: string): void => {
    city.trim() && this.router.navigate([], { queryParams: { city } });
  };

  restrictChars(event: KeyboardEvent): boolean {
    return /[\w|\-|\s]/.test(event.key);
  }

  private tryToDetectCity(): void {
    const queryParams = new HttpParams({ fromString: window.location.search });
    if (queryParams.get('city')) {
      return;
    }
    this.geolocationService.detectCity().subscribe({
      next: this.navigateToCity,
      error: this.detectCityErrorHandler
    });
  }

  private updateCityByQueryParam = (params: Params): void => {
    const city = params['city'];
    if (city) {
      this.showForm = false;
      this.city = city;
      this.observableCity.update(city);
      this.title.setTitle(`Weather – ${city}`);
    }
  };

  private setCurrentConditionsData = (currentConditions: CurrentConditions): void => {
    this.currentConditions = currentConditions;
    const timezone = currentConditions.timezone;
    this.time = formatDate(datetimeByTimezoneOffset(timezone.offset), 'HH:mm cccc', 'en-US');
    this.timezone = timezone.name;
  };

  private detectCityErrorHandler = (error: Error): void => {
    this.errorMessage = error.message;
    this.showError = true;
    this.navigateToCity(GeolocationService.DEFAULT_CITY);
    setTimeout(() => this.showError = false, 10_000);
  };
}
