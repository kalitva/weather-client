import { Observable } from 'rxjs';

export abstract class CitySearchService {

  abstract searchCity(query: string): Observable<string[]>;
}
