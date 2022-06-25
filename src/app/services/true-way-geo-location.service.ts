import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map, mergeMap } from 'rxjs';
import { GeoLocationService } from './geo-location.service';

@Injectable()
export class TrueWayGeoLocationService implements GeoLocationService {
  constructor(private httpClient: HttpClient) {
  }

  /*
   * docs: https://rapidapi.com/trueway/api/trueway-geocoding/
   */
  detectCity(): Observable<string> {
    const url = 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode';
    const headers = {
      'X-RapidAPI-Key': '61bb649c42msh7458574855e1682p16c9d8jsnbb57896d2662',
      'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    };
    return from(new Promise<GeolocationCoordinates>(resolve => {
      navigator.geolocation.getCurrentPosition(p => resolve(p.coords));
    }))
      .pipe(map(coords => ({
        location: `${coords.latitude},${coords.longitude}`,
        language: 'en'
      })))
      .pipe(mergeMap(params => this.httpClient.get(url, { headers, params })))
      .pipe(map((data: any) => data.results[1].locality));
  }
}
