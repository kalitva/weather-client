import { Observable } from 'rxjs';
import { CurrentConditions } from '../model/current-conditions.model';

export abstract class WeatherApiService {

//  public abstract forecast(city: string): Observable<Map<string, Weather[]>>;

  abstract currentConditions(city: string): Observable<CurrentConditions>;
}
