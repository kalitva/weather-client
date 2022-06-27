import { Decoration } from './decoration.enum';

export interface CurrentConditions {
  temp: number;
  maxTemp: number;
  minTemp: number;
  description: string;
  decoration: Decoration;
}
