import { Observable } from 'rxjs';

export abstract class GeolocationService {

  abstract detectCity(): Observable<string>;
}
