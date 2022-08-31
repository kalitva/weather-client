import { Subject } from 'rxjs';

export abstract class State<S> {
  private readonly subject: Subject<S>;

  constructor() {
    this.subject = new Subject;
  }

  update(newValue: S): void {
    this.subject.next(newValue);
  }

  onChange(subscriber: (newValue: S) => void): void {
    this.subject.subscribe(subscriber);
  }
}
