/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { City } from 'src/app/model/city.model';
import { CitySearchService } from '../city-search.service';

/*
 * resource: https://apidocs.geoapify.com/docs/geocoding/address-autocomplete/#autocomplete
 */
@Injectable()
export class GeoapifyCitySearchService implements CitySearchService {
  constructor(private httpClient: HttpClient) {}

  searchCity(query: string): Observable<City[]> {
    const params = {
      apiKey:'e2b52e0a50ca42fe96aeecf696179afb',
      text: query,
      type: 'city',
      lang: 'en',
    };
    return this.httpClient.get('https://api.geoapify.com/v1/geocode/autocomplete', { params })
      .pipe(map((d: any) => d.features.map((f: any): City => ({
        name: f.properties.city,
        country: f.properties.country
      }))))
      .pipe(map(this.filterByNullAndUniqueCountry));
  }

  private filterByNullAndUniqueCountry(cities: City[]): City[] {
    return [...new Map(cities.reverse().map(c => [c.name, c])).values()]
      .filter(c => c.name);
  }
}
