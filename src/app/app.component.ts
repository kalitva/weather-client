import { Component, OnInit } from '@angular/core';
import { CurrentConditions } from './model/current-conditions.model';
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

  constructor(private observableCurrentConditions: ObservableCurrentConditions) {
  }

  ngOnInit(): void {
    this.observableCurrentConditions.onChange(this.updateDecoration);
  }

  private updateDecoration = (currentConditions: CurrentConditions): void => {
    const timeOfDay = timeOfDayByTimezoneOffset(currentConditions.timezone.offset);
    this.backgroundImagePath = `url(assets/bg/${timeOfDay}/${currentConditions.decoration}.jpg)`;
    this.visorColorClass = `visor-color-${currentConditions.decoration}`;
  };
}
