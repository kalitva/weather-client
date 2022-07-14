import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObservableCity } from 'src/app/state/observable-city';
import { ObservableTimezone } from 'src/app/state/observable-timezone';
import { datetimeByTimezoneOffset } from 'src/app/util/datetime-util';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Timezone } from 'src/app/model/timezone.model';

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

  constructor(private geolocationService: GeolocationService,
              private router: Router,
              private activatedRout: ActivatedRoute,
              private observableCity: ObservableCity,
              private observableTimezone: ObservableTimezone) {
  }

  // TODO handle errors on detectCity() call
  ngOnInit(): void {
    const queryParams = new HttpParams({ fromString: window.location.search });
    if (!queryParams.get('city')) {
      this.geolocationService.detectCity().subscribe(this.navigateToCity);
    }
    this.activatedRout.queryParams.subscribe(this.updateCityByQueryParams);
    this.observableTimezone.onChange(this.setCurrentTimeAndTimezone);
  }

  navigateToCity = (city: string): void => {
    city && this.router.navigate([], { queryParams: { city } });
  };

  private updateCityByQueryParams = (params: Params): void => {
    const city = params['city'];
    this.showForm = false;
    this.city = city;
    this.observableCity.update(city);
  };

  private setCurrentTimeAndTimezone = (timezone: Timezone): void => {
    this.time = formatDate(datetimeByTimezoneOffset(timezone.offset), 'HH:mm cccc', 'en-US');
    this.timezone = timezone.name;
  };
}
