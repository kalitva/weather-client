import { Observable } from 'rxjs';
import { Origin } from './origin';

export abstract class GeolocationService extends Origin {
  static readonly DEFAULT_CITY = 'Moscow';

  abstract detectCity(): Observable<string>;
}
