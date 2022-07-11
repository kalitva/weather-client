import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObservableCity } from 'src/app/logic/observable-city';
import { ObservableTimezone } from 'src/app/logic/observable-timezone';
import { datetimeByOffset } from 'src/app/logic/util';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  city: string;
  time: string;
  showForm: boolean;

  constructor(
      private geolocationService: GeolocationService,
      private observableCity: ObservableCity,
      private observableTimezone: ObservableTimezone) {
  }

  ngOnInit(): void {
    // TODO handle errors
    this.geolocationService.detectCity().subscribe(this.updateCity);
    this.observableTimezone.onChange(tz => {
      this.time = formatDate(datetimeByOffset(tz.offset), 'HH:mm cccc', 'en-US');
    });
  }

  updateCity = (city: string): void => {
    this.showForm = false;
    this.city = city;
    this.observableCity.update(city);
  };
}
