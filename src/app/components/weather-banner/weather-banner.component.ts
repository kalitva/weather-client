import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-banner',
  templateUrl: './weather-banner.component.html',
  styleUrls: ['./weather-banner.component.css']
})
export abstract class WeatherBannerComponent implements OnInit {
  @Input() city: string;
	@Input() day: Date;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.weatherService.getWeather(this.city, this.day)
      .subscribe(r => console.dir(r));
  }

	public abstract formattedTempValue(): string;

	public abstract fromWhichHour(): number;
}
