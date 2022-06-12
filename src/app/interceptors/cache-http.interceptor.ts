import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

/*
 * The cache keeps http response for an hour
 */
@Injectable()
export class CacheHttpInterceptor implements HttpInterceptor {
  private static readonly DATE_AND_HOURS_LENGTH = 13;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const hash = request.url + new Date().toISOString().slice(0, CacheHttpInterceptor.DATE_AND_HOURS_LENGTH);
    const value = localStorage.getItem(hash) || '';
    if (value) {
      const response = JSON.parse(value);
      return of(
        new HttpResponse({
          body: response.body,
          headers: response.headers,
          status: response.status,
          url: response.url
        })
      );
    }
    return next.handle(request)
      .pipe(tap(event => event instanceof HttpResponse && localStorage.setItem(hash, JSON.stringify(event))));
  }
}
