import { Observable } from 'rxjs';
import { CurrentConditions } from '../model/current-conditions.model';
import { Day } from '../model/day.model';
import { Hour } from '../model/hour.model';

export abstract class WeatherApiService {

  abstract hoursForecast(city: string): Observable<Hour[]>;

  abstract next10DaysForecast(city: string): Observable<Day[]>

  abstract currentConditions(city: string): Observable<CurrentConditions>;
}
