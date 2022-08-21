import { Component, OnInit } from '@angular/core';
import { CurrentConditions } from './model/current-conditions.model';
import { BackgroundService } from './services/background.service';
import { LoadingState } from './state/loading-state';
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
    private backgroundService: BackgroundService,
  ) {
    this.backgroundUrl = 'url(assets/bg/default.jpg)';
    this.beingLoaded = true;
  }

  ngOnInit(): void {
    this.observableCurrentConditions.onChange(this.updateDecoration);
    this.loadingState.onChange(bl => this.beingLoaded = bl);
  }

  private updateDecoration = (currentConditions: CurrentConditions): void => {
    const timeOfDay = timeOfDayByTimezoneOffset(currentConditions.timezone.offset);
    const query = `${timeOfDay} ${currentConditions.decoration} ${currentConditions.address}`;
    this.backgroundService.backgroundUrlByQuery(query).subscribe({
      next: url => this.backgroundUrl = `url(${url})`,
      error: () => {
        console.error('falied to load background');
        this.backgroundUrl = `url(assets/bg/${timeOfDay}/${currentConditions.decoration}.jpg)`;
      }
    });
    this.visorColorClass = `visor-color-${currentConditions.decoration}`;
  };
}
