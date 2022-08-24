/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { City } from '../../model/city.model';
import { CitySearchService } from '../city-search.service';

/*
 * resource: https://rapidapi.com/Spott/api/spott
 */
@Injectable()
export class SpottCitySearchService implements CitySearchService {
  constructor(private httpClient: HttpClient) {}

  searchCity(query: string): Observable<City[]> {
    const headers = {
      'X-RapidAPI-Key': '61bb649c42msh7458574855e1682p16c9d8jsnbb57896d2662',
      'X-RapidAPI-Host': 'spott.p.rapidapi.com'
    };
    const params = {
      type: ' CITY',
      language: 'en',
      limit: 15,
      q: query,
    };
    return this.httpClient.get('https://spott.p.rapidapi.com/places', { headers, params })
      .pipe(map((data: any) => {
        return data.map((l: any): City => ({ name: l.name, country: l.country.name }));
      }));
  }
}
