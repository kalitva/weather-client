import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ObservableCity } from 'src/app/state/observable-city';
import { ObservableTimezone } from 'src/app/state/observable-timezone';
import { CurrentConditions } from 'src/app/model/current-conditions.model';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { uvIndexScale } from 'src/app/util/measure-util';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {
  @Output() conditionsChanged: EventEmitter<CurrentConditions>;

  currentConditions: CurrentConditions;
  iconSrc: string;

  constructor(private weatherApiService: WeatherApiService,
              private observableCity: ObservableCity,
              private observableTimezone: ObservableTimezone) {
    this.conditionsChanged = new EventEmitter();
  }

  ngOnInit(): void {
    this.observableCity.onChanged(c => {
      this.weatherApiService.currentConditions(c).subscribe(cc => {
        this.currentConditions = cc;
        this.iconSrc = `assets/icons/${cc.icon}.svg`;
        this.conditionsChanged.emit(cc);
        this.observableTimezone.update(cc.timezone);
      });
    });
  }

  uvIndexScale(uvIndex: number | undefined): string {
    return uvIndexScale(uvIndex || 0);
  }
}
