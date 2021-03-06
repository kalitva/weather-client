import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CurrentConditions } from '../model/current-conditions.model';

@Injectable({ providedIn: 'root' })
export class ObservableCurrentConditions {
  private readonly subject: Subject<CurrentConditions>;

  constructor() {
    this.subject = new Subject;
  }

  update(currentConditions: CurrentConditions): void {
    this.subject.next(currentConditions);
  }

  onChange(subscriber: (currentConditions: CurrentConditions) => void): void {
    this.subject.subscribe(subscriber);
  }
}
