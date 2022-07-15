import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingState {
  private readonly loaded: Subject<boolean>;

  constructor() {
    this.loaded = new Subject();
  }

  update(loaded: boolean): void {
    this.loaded.next(loaded);
  }

  onChange(subscriber: (loaded: boolean) => void): void {
    this.loaded.subscribe(subscriber);
  }
}
