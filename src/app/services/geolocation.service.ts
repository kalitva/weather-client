import { Observable } from 'rxjs';

export abstract class GeolocationService {
  static readonly DEFAULT_CITY = 'Moscow';

  abstract detectCity(): Observable<string>;
}
