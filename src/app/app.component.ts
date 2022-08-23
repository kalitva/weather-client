import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingState } from './state/loading-state';
import { ObservableCity } from './state/observable-city';
import { ObservableCurrentConditions } from './state/observable-current-conditions';
import { timeOfDayByTimezoneOffset } from './util/datetime-util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  backgroundUrl: string;
  visorColorClass: string;
  beingLoaded: boolean;

  constructor(
    private observableCurrentConditions: ObservableCurrentConditions,
    private loadingState: LoadingState,
    private observableCity: ObservableCity,
    private title: Title,
  ) {
    this.backgroundUrl = 'url(assets/bg/default.jpg)';
    this.beingLoaded = true;
  }

  ngOnInit(): void {
    this.observableCity.onChanged(c => this.title.setTitle(`Weather – ${c}`));
    this.observableCurrentConditions.onChange(cc => {
      const timeOfDay = timeOfDayByTimezoneOffset(cc.timezone.offset);
      this.backgroundUrl = `url(assets/bg/${timeOfDay}/${cc.decoration}.jpg)`;
      this.visorColorClass = `visor-color-${cc.decoration}`;
    });
    this.loadingState.onChange(bl => this.beingLoaded = bl);
  }
}
