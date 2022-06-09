import { Observable } from 'rxjs';
import { Weather } from '../model/weather';

export abstract class WeatherApiService {

  public abstract forecast(city: string): Observable<Map<string, Weather[]>>;
}
