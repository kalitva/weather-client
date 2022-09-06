import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, timeout } from 'rxjs';

@Injectable()
export class TimeOutInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(timeout(10_000), catchError(() => {
      throw new Error('Connection timed out');
    }));
  }
}
