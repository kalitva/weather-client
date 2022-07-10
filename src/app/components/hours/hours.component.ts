import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObservableCity } from 'src/app/logic/observable-city';
import { Hour } from 'src/app/model/hour.model';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit, AfterViewChecked {
  private static readonly HOUR_CONTAINER_WIDTH = 100 + 6;

  // TODO try to implement draggable scroll
  @ViewChild('slider') slider: ElementRef;

  hours: Hour[];

  constructor(private weatherApiService: WeatherApiService, private observableCity: ObservableCity) {
  }

  ngOnInit(): void {
    this.observableCity.onChanged(c => {
      this.weatherApiService.hoursForecast(c).subscribe(hf => this.hours = hf);
    });
  }

  // TODO try to move in on city changed
  ngAfterViewChecked(): void {
    if (!this.hours) {
      return;
    }
    const paneToScroll = new Date().getHours() + 1;
    this.slider.nativeElement.scrollLeft = paneToScroll * HoursComponent.HOUR_CONTAINER_WIDTH;
  }

  iconSrc(hour: Hour): string {
    return `assets/icons/${hour.icon}.svg`;
  }
}
