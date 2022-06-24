import { Decoration } from './decoration.enum';
import { Hour } from './hour.model';

export interface CurrentConditions {
  city: string;
  description: string;
  decoration: Decoration;

  hours: Hour[];
}
