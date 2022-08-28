import { Observable } from 'rxjs';
import { OriginAware } from './origin-aware';

export abstract class GeolocationService extends OriginAware {
  static readonly DEFAULT_CITY = 'Moscow';

  abstract detectCity(): Observable<string>;
}
