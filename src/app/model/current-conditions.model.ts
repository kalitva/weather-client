import { Decoration } from './decoration.enum';
import { Icon } from './icon.enum';
import { Timezone } from './timezone.model';

export interface CurrentConditions {
  address: string;
  summary: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  feelsLike: number;
  description: string;
  decoration: Decoration;
  icon: Icon;
  timezone: Timezone;
  windSpeed: number;
  cloudCover: number;
  humidity: number;
  pressure: number;
  uvIndex: number;
}
