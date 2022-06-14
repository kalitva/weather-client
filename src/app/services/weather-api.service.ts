import { Observable } from 'rxjs';
import { Weather } from '../model/weather.model';

export abstract class WeatherApiService {

  public abstract forecast(city: string): Observable<Map<Date, Weather[]>>;
}
