import { Observable } from 'rxjs';
import { CurrentConditions } from '../model/current-conditions.model';
import { Hour } from '../model/hour.model';

export abstract class WeatherApiService {

  abstract hoursForecast(city: string): Observable<Hour[]>;

  abstract currentConditions(city: string): Observable<CurrentConditions>;
}
