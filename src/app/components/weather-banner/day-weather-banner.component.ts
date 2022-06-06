import { WeatherBannerComponent } from "./weather-banner.component";
import { Component } from "@angular/core";

@Component({
  selector: 'app-day-weather-banner',
  templateUrl: './weather-banner.component.html',
  styleUrls: ['./weather-banner.component.css']
})
export class DayWeatherBannerComponent extends WeatherBannerComponent {

	public formattedTempValue(): string {
		throw new Error("Method not implemented.");
	}

	public fromWhichHour(): number {
		throw new Error("Method not implemented.");
	}

}
