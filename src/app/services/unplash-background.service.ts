import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BackgroundService } from './background.service';

@Injectable()
export class UnplashBackgroundService implements BackgroundService {
  constructor(private httpClient: HttpClient) {
  }

  backgroundUrlByQuery(query: string): Observable<string> {
    const url = 'https://api.unsplash.com/photos/random';
    const headers = { Authorization: 'Client-ID y50lBisTw7_lv5vAZqQt5smFdqz4vRBdONFrk766XvY' };
    const params = {
      // topics: 'weather',
      orientation: 'portrait',
      content_filter: 'high',
      query,
    };
    return this.httpClient.get(url, { headers, params })
      .pipe(map((data: any) => data.urls.regular));
  }
}
