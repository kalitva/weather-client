import { Component, OnInit } from '@angular/core';
import { CurrentConditions } from './model/current-conditions.model';
import { LoadingState } from './state/loading-state';
import { ObservableCurrentConditions } from './state/observable-current-conditions';
import { timeOfDayByTimezoneOffset } from './util/datetime-util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  backgroundImagePath: string;
  visorColorClass: string;
  beingLoaded: boolean;

  constructor(private observableCurrentConditions: ObservableCurrentConditions,
              private loadingState: LoadingState) {
  }

  ngOnInit(): void {
    this.observableCurrentConditions.onChange(this.updateDecoration);
    this.loadingState.onChange(bl => this.beingLoaded = bl);
  }

  private updateDecoration = (currentConditions: CurrentConditions): void => {
    const timeOfDay = timeOfDayByTimezoneOffset(currentConditions.timezone.offset);
    this.backgroundImagePath = `url(assets/bg/${timeOfDay}/${currentConditions.decoration}.jpg)`;
    this.visorColorClass = `visor-color-${currentConditions.decoration}`;
  };
}
