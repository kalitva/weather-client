/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, firstValueFrom } from 'rxjs';
import { GeolocationService } from './geolocation.service';

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
    const callback = (resolve: any, reject: any): void => {
      navigator.geolocation.getCurrentPosition(p => resolve(p.coords), e => reject(e));
    };
    return from(
      new Promise<GeolocationCoordinates>(callback)
        .then(coords => ({ location: `${coords.latitude},${coords.longitude}`, language: 'en' }))
        .then(params => firstValueFrom(this.httpClient.get(url, { headers, params })))
        .then((data: any) => data.results[1].locality)
        .catch(e => { throw e; })
    );
  }
}
