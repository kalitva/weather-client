import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObservableCity } from 'src/app/logic/observable-city';
import { Day } from 'src/app/model/day.model';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {
  days: Day[];

  constructor(private weatherApiService: WeatherApiService, private observableCity: ObservableCity) {
  }

  ngOnInit(): void {
    this.observableCity.onChanged(c => {
      this.weatherApiService.next10DaysForecast(c).subscribe(days => this.days = days);
    });
  }

  formatDate(date: string): string {
    return formatDate(new Date(date), 'cccc MM/d', 'en-US');
  }

  iconSrc(icon: string): string {
    return `assets/icons/${icon}.svg`;
  }
}
