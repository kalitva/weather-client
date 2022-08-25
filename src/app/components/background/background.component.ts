import { Component, OnInit } from '@angular/core';
import { ObservableCurrentConditions } from 'src/app/state/observable-current-conditions';
import { timeOfDayByTimezoneOffset } from 'src/app/util/datetime-util';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  backgroundUrl: string;
  visorColorClass: string;

  constructor(private observableCurrentConditions: ObservableCurrentConditions) {}

  ngOnInit(): void {
    this.observableCurrentConditions.onChange(cc => {
      const timeOfDay = timeOfDayByTimezoneOffset(cc.timezone.offset);
      this.backgroundUrl = `url(assets/bg/${timeOfDay}/${cc.decoration}.jpg)`;
      this.visorColorClass = `visor-color-${cc.decoration}`;
    });
  }
}
