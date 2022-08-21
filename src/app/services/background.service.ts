import { Observable } from 'rxjs';

export abstract class BackgroundService {

  abstract backgroundUrlByQuery(query: string): Observable<string>
}
