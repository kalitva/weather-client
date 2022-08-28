import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { LoadingStateManager } from '../state/loading-state-manager';

@Injectable()
export class ResponseLoadingStateInterceptor implements HttpInterceptor {
  constructor(private loadingStateManager: LoadingStateManager) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingStateManager.update(request.url, true);
    return next.handle(request)
      .pipe(catchError(e => {
        this.loadingStateManager.update(request.url, false);
        throw e;
      }))
      .pipe(tap(event => {
        if (event instanceof HttpResponse) {
          this.loadingStateManager.update(request.url, false);
        }
      }));
  }
}
