import { Component, OnInit } from '@angular/core';
import { ObservableCity } from 'src/app/state/observable-city';
import { CurrentConditions } from 'src/app/model/current-conditions.model';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { uvIndexScale } from 'src/app/util/measure-util';
import { ObservableCurrentConditions } from 'src/app/state/observable-current-conditions';
import { ErrorState } from 'src/app/state/error-state';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {
  currentConditions: CurrentConditions;
  iconSrc: string;

  constructor(private weatherApiService: WeatherApiService,
              private observableCity: ObservableCity,
              private observableCurrentConditions: ObservableCurrentConditions,
              private errorState: ErrorState) {
  }

  ngOnInit(): void {
    this.observableCity.onChanged(c => {
      this.weatherApiService.currentConditions(c).subscribe({
        next: this.setCurrentConditionsData,
        error: this.errorHandler
      });
    });
  }

  uvIndexScale(uvIndex: number | undefined): string {
    return uvIndexScale(uvIndex || 0);
  }

  private setCurrentConditionsData = (currentConditions: CurrentConditions): void => {
    this.currentConditions = currentConditions;
    this.iconSrc = `assets/icons/${currentConditions.icon}.svg`;
    this.observableCurrentConditions.update(currentConditions);
  };

  private errorHandler = (error: Error): void => {
    this.errorState.riseError({
      problem: 'Oops! An error ocurred trying to get current weather:',
      message: error instanceof HttpErrorResponse ? (error as HttpErrorResponse).error : error.message
    });
  };
}
