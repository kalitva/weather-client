import { Decoration } from './decoration.enum';
import { Icon } from './icon.enum';

export interface CurrentConditions {
  temp: number;
  maxTemp: number;
  minTemp: number;
  description: string;
  decoration: Decoration;
  icon: Icon;
}
