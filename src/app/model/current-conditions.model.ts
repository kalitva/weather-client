import { Decoration } from './decoration.enum';
import { Hour } from './hour.model';

export interface CurrentConditions {
  description: string;
  decoration: Decoration;

  hours: Hour[];
}
