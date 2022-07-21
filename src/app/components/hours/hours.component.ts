import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObservableCity } from 'src/app/state/observable-city';
import { datetimeByTimezoneOffset } from 'src/app/util/datetime-util';
import { Hour } from 'src/app/model/hour.model';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { ObservableCurrentConditions } from 'src/app/state/observable-current-conditions';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit, AfterViewChecked {
  private static readonly HOUR_CONTAINER_WIDTH = 90 + 6.5;

  // TODO try to implement draggable scroll
  @ViewChild('slider') slider: ElementRef;

  hours: Hour[];

  private date: Date;

  constructor(private weatherApiService: WeatherApiService,
              private observableCity: ObservableCity,
              private observableCurrentConditions: ObservableCurrentConditions) {
  }

  ngOnInit(): void {
    this.observableCity.onChanged(c => {
      this.weatherApiService.hoursForecast(c).subscribe(hf => this.hours = hf);
    });
    this.observableCurrentConditions.onChange(cc => {
      this.date = datetimeByTimezoneOffset(cc.timezone.offset);
    });
  }

  ngAfterViewChecked(): void {
    if (!this.hours || !this.date) {
      return;
    }
    const paneToScroll = this.date.getHours() + 1;
    this.slider.nativeElement.scrollLeft = paneToScroll * HoursComponent.HOUR_CONTAINER_WIDTH;
  }

  iconSrc(hour: Hour): string {
    return `assets/icons/${hour.icon}.svg`;
  }
}
