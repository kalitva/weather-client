import { Directive, Input } from '@angular/core';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Directive()
export abstract class WeatherBannerComponent {
  @Input() city: string;

  constructor(protected apiService: WeatherApiService) {
  }

	public abstract formattedTempValue(): string;

	public abstract fromWhichHour(): number;
}
