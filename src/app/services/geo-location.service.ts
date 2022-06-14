import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  constructor(private httpClient: HttpClient) {
  }

  detectCity(): Observable<string> {
    return this.httpClient.get('https://geolocation-db.com/json/geoip')
      .pipe(map((data: any) => data.city));
  }
}
