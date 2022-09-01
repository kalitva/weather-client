import { Component, OnInit } from '@angular/core';
import { ObservableCity } from 'src/app/state/observable-city';
import { CurrentConditions } from 'src/app/model/current-conditions.model';
import { WeatherApiService } from 'src/app/services/weather-api.service';
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

  constructor(
    private weatherApiService: WeatherApiService,
    private observableCity: ObservableCity,
    private observableCurrentConditions: ObservableCurrentConditions,
    private errorState: ErrorState
  ) {}

  ngOnInit(): void {
    this.observableCity.onChange(c => {
      this.weatherApiService.currentConditions(c).subscribe({
        next: cc => {
          this.currentConditions = cc;
          this.iconSrc = `assets/icons/conditions/${cc.icon}.svg`;
          this.observableCurrentConditions.update(cc);
        },
        error: e => {
          this.errorState.riseError({
            problem: 'Oops! An error ocurred trying to get current weather:',
            message: e instanceof HttpErrorResponse ? (e as HttpErrorResponse).error : e.message
          });
        },
      });
    });
  }
}
