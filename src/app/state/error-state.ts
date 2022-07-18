import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorInfo } from '../model/error-info.model';

@Injectable({ providedIn: 'root' })
export class ErrorState {
  private readonly subject: Subject<ErrorInfo>;

  constructor() {
    this.subject = new Subject();
  }

  riseError(errorInfo: ErrorInfo): void {
    this.subject.next(errorInfo);
  }

  onError(subscriber: (ei: ErrorInfo) => void): void {
    this.subject.subscribe(subscriber);
  }
}
