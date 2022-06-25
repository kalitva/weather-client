import { Observable } from 'rxjs';

export abstract class GeoLocationService {

  abstract detectCity(): Observable<string>;
}
