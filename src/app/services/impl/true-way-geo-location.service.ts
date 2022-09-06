/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, mergeMap } from 'rxjs';
import { GeolocationService } from '../geolocation.service';

/*
 * docs: https://rapidapi.com/trueway/api/trueway-geocoding/
 */
@Injectable()
export class TrueWayGeolocationService implements GeolocationService {
  constructor(private httpClient: HttpClient) {}

  detectCity(): Observable<string> {
    const url = 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode';
    const headers = {
      'X-RapidAPI-Key': '61bb649c42msh7458574855e1682p16c9d8jsnbb57896d2662',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    };
    return new Observable<GeolocationCoordinates>(observer => {
      navigator.geolocation.getCurrentPosition(
        p => observer.next(p.coords),
        e => observer.error(e),
        { timeout: 7_000 }
      );
    })
      .pipe(map(coords => ({ location: `${coords.latitude},${coords.longitude}`, language: 'en' })))
      .pipe(mergeMap(params => this.httpClient.get(url, { headers, params } )))
      .pipe(map((data: any) => data.results[1].locality));
  }

  getOrigin(): string {
    return 'https://trueway-geocoding.p.rapidapi.com';
  }
}
