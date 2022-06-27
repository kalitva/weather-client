import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs';
import { Hour } from 'src/app/model/hour.model';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit, AfterViewChecked {
  private static readonly HOUR_CONTAINER_WIDTH = 110;

  @ViewChild('slider') slider: ElementRef;

  hours: Hour[];

  constructor(private locationService: GeolocationService, private apiService: WeatherApiService) {
  }

  ngOnInit(): void {
    this.locationService.detectCity()
      .pipe(mergeMap(c => this.apiService.hoursForecast(c)))
      .subscribe(hf => this.hours = hf);
  }

  ngAfterViewChecked(): void {
    if (!this.hours) {
      return;
    }
    const paneToScroll = new Date().getHours() + 1;
    this.slider.nativeElement.scrollLeft = paneToScroll * HoursComponent.HOUR_CONTAINER_WIDTH;
  }

  iconSrc(hour: Hour): string {
    return `../../../assets/icons/${hour.decoration}.svg`;
  }
}
