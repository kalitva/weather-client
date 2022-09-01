import { Component, OnInit } from '@angular/core';
import { datetimeByTimezoneOffset } from 'src/app/util/datetime-util';
import { Hour } from 'src/app/model/hour.model';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { ObservableCurrentConditions } from 'src/app/state/observable-current-conditions';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {
  hours: Hour[];

  constructor(
    private weatherApiService: WeatherApiService,
    private observableCurrentConditions: ObservableCurrentConditions
  ) {}

  ngOnInit(): void {
    this.observableCurrentConditions.onChange(cc => {
      const date = datetimeByTimezoneOffset(cc.timezone.offset);
      this.weatherApiService.hoursForecast(cc.address).subscribe(hf => {
        this.hours = hf.slice(date.getHours() + 1);
      });
    });
  }

  iconSrc(hour: Hour): string {
    return `assets/icons/conditions/${hour.icon}.svg`;
  }
}
