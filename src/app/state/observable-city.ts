import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { State } from './state';

@Injectable({ providedIn: 'root' })
export class ObservableCity implements State<string> {
  private readonly subject: Subject<string>;

  constructor() {
    this.subject = new Subject;
  }

  update(city: string): void {
    this.subject.next(city);
  }

  onChange(subscriber: (city: string) => void): void {
    this.subject.subscribe(subscriber);
  }
}
