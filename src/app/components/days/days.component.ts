import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/model/day.model';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {
  days: Day[];

  constructor(private weatherApi: WeatherApiService) {
  }

  ngOnInit(): void {
    // TODO city
    this.weatherApi.next10DaysForecast('Rostov-on-Don')
      .subscribe(days => this.days = days);
  }

  formatDate(date: string): string {
    return formatDate(new Date(date), 'cccc MM/d', 'en-US');
  }

  iconSrc(icon: string): string {
    return `assets/icons/${icon}.svg`;
  }
}
