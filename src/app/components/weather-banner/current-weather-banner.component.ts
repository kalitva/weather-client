import { WeatherBannerComponent } from "./weather-banner.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-current-weather-banner[city]',
  templateUrl: './weather-banner.component.html',
  styleUrls: ['./weather-banner.component.css']
})
export class CurrentWeatherBannerComponent extends WeatherBannerComponent implements OnInit {

  ngOnInit(): void {
    this.apiService.getWeather(this.city, new Date)
      .subscribe(r => console.dir(r));
  }

  override formattedTempValue(): string {
    throw new Error("Method not implemented.");
  }

  override fromWhichHour(): number {
    throw new Error("Method not implemented.");
  }
}
