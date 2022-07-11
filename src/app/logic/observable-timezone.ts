import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Timezone } from '../model/timezone.model';

@Injectable({ providedIn: 'root' })
export class ObservableTimezone {
  private readonly subject: Subject<Timezone>;

  constructor() {
    this.subject = new Subject;
  }

  update(timezone: Timezone): void {
    this.subject.next(timezone);
  }

  onChange(subscriber: (timezone: Timezone) => void): void {
    this.subject.subscribe(subscriber);
  }
}
