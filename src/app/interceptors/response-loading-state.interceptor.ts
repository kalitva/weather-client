import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { LoadingState } from '../state/loading-state';

@Injectable()
export class ResponseLoadingStateInterceptor implements HttpInterceptor {
  private waitingRequests: number;

  constructor(private loadingState: LoadingState) {
    this.waitingRequests = 0;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingState.update(true);
    this.waitingRequests++;
    return next.handle(request)
      .pipe(catchError(this.errorHandler))
      .pipe(tap(e => e instanceof HttpResponse && this.loadingState.update(!!(--this.waitingRequests))));
  }

  private errorHandler = (error: Error): Observable<HttpEvent<unknown>> => {
    this.loadingState.update(false);
    this.waitingRequests = 0;
    throw error;
  };
}
