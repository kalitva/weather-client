import { Component } from '@angular/core';
import { timeOfDayByOffset } from './util/datetime-util';
import { CurrentConditions } from './model/current-conditions.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  backgroundImagePath: string;
  visorColorClass: string;

  updateDecoration(currentConditions: CurrentConditions): void {
    const timeOfDay = timeOfDayByOffset(currentConditions.timezone.offset);
    this.backgroundImagePath = `url(assets/bg/${timeOfDay}/${currentConditions.decoration}.jpg)`;
    this.visorColorClass = `visor-color-${currentConditions.decoration}`;
  }
}
