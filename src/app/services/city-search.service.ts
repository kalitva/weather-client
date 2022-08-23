import { Observable } from 'rxjs';
import { City } from '../model/city.model';

export abstract class CitySearchService {

  abstract searchCity(query: string): Observable<City[]>;
}
