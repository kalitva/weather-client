import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ObservableCity {
  private readonly subject: Subject<string>;

  constructor() {
    this.subject = new Subject();
  }

  update(city: string): void {
    this.subject.next(city);
  }

  onChanged(subscriber: (city: string) => void): void {
    this.subject.subscribe(subscriber);
  }
}
