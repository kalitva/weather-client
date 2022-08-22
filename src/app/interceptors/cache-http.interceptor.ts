import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

const DATE_AND_HOURS_LENGTH = 13;
const resourcesToCache = [
  'https://weather.visualcrossing.com/',
  'https://trueway-geocoding.p.rapidapi.com/'
];

/*
 * The cache keeps http response for an hour
 */
@Injectable()
export class CacheHttpInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }
    const hash = this.hashFromRequest(request);
    const cached = localStorage.getItem(hash) ?? '';
    if (cached) {
      return of(new HttpResponse(JSON.parse(cached)));
    }
    return next.handle(request)
      .pipe(tap(event => {
        const shouldBeCached = resourcesToCache.some(url => request.url.startsWith(url));
        if (event instanceof HttpResponse && shouldBeCached) {
          this.setItem(hash, JSON.stringify(event));
        }
      }));
  }

  private hashFromRequest(request: HttpRequest<unknown>): string {
    const date = new Date().toISOString().slice(0, DATE_AND_HOURS_LENGTH);
    return request.urlWithParams + date;
  }

  private setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      localStorage.clear();
    }
  }
}
