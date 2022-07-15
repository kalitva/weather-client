import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingState } from '../state/loading-state';

@Injectable()
export class ResponseLoadingStateInterceptor implements HttpInterceptor {
  private waitingRequests: number;

  constructor(private loadingState: LoadingState) {
    this.waitingRequests = 0;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingState.update(false);
    this.waitingRequests++;
    return next.handle(request)
      .pipe(tap(e => e instanceof HttpResponse && this.loadingState.update((--this.waitingRequests) === 0)));
  }
}
