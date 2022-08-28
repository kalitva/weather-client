import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObservableCity } from 'src/app/state/observable-city';
import { Day } from 'src/app/model/day.model';
import { WeatherApiService } from 'src/app/services/weather-api.service';

const DAYS_TO_FORECAST = 10;

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {
  days: Day[];
  closedOpenDayState: boolean[];

  constructor(
    private weatherApiService: WeatherApiService,
    private observableCity: ObservableCity
  ) {
    this.closedOpenDayState = Array(DAYS_TO_FORECAST).fill(false);
  }

  ngOnInit(): void {
    this.observableCity.onChange(c => {
      this.weatherApiService.next10DaysForecast(c).subscribe(df => this.days = df);
    });
  }

  toggleDay(index: number): void {
    this.closedOpenDayState[index] = !this.closedOpenDayState[index];
  }

  formatDate(date: string): string {
    return formatDate(new Date(date), 'cccc d MMM', 'en-US');
  }

  iconSrc(icon: string): string {
    return `assets/icons/conditions/${icon}.svg`;
  }
}
