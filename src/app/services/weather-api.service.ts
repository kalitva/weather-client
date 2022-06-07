import { Observable } from "rxjs";
import { Weather } from "../model/weather";

export abstract class WeatherApiService {

  public abstract getWeather(city: string, day: Date): Observable<Weather[]>;
}
