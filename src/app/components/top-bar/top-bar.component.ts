import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObservableCity } from 'src/app/state/observable-city';
import { datetimeByTimezoneOffset } from 'src/app/util/datetime-util';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ObservableCurrentConditions } from 'src/app/state/observable-current-conditions';
import { CurrentConditions } from 'src/app/model/current-conditions.model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  city: string;
  time: string;
  timezone: string;
  showForm: boolean;
  showError: boolean;
  errorMessage: string;

  constructor(private geolocationService: GeolocationService,
              private router: Router,
              private activatedRout: ActivatedRoute,
              private observableCity: ObservableCity,
              private observableCurrentConditions: ObservableCurrentConditions) {
  }

  // TODO handle errors on detectCity() call
  ngOnInit(): void {
    this.tryToDetectCity();
    this.activatedRout.queryParams.subscribe(this.updateCityByQueryParams);
    this.observableCurrentConditions.onChange(this.setCurrentTimeAndTimezone);
  }

  navigateToCity = (city: string): void => {
    city && this.router.navigate([], { queryParams: { city } });
  };

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

  private updateCityByQueryParams = (params: Params): void => {
    const city = params['city'];
    if (city) {
      this.showForm = false;
      this.city = city;
      this.observableCity.update(city);
    }
  };

  private setCurrentTimeAndTimezone = (currentConditions: CurrentConditions): void => {
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
