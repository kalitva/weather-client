import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingState {
  private readonly beingLoaded: Subject<boolean>;

  constructor() {
    this.beingLoaded = new Subject();
  }

  update(beingLoaded: boolean): void {
    this.beingLoaded.next(beingLoaded);
  }

  onChange(subscriber: (beingLoaded: boolean) => void): void {
    this.beingLoaded.subscribe(subscriber);
  }
}
