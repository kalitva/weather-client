import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ORIGIN_AWARES } from '../app.module';
import { OriginAware } from '../services/origin-aware';
import { State } from './state';

@Injectable({ providedIn: 'root' })
export class LoadingStateManager {
  private states: { [key: string]: State<boolean> };

  constructor(@Inject(ORIGIN_AWARES) private services: OriginAware[]) {
    this.states = {};
    services.forEach(s => {
      this.states[s.getOrigin()] = new class implements State<boolean> {
        private readonly subject: Subject<boolean> = new Subject;

        update(beingLoaded: boolean): void {
          this.subject.next(beingLoaded);
        }

        onChange(subscriber: (beingLoaded: boolean) => void): void {
          this.subject.subscribe(subscriber);
        }
      };
    });
  }

  update(url: string, beingLoaded: boolean): void {
    const key = this.services.find(s => url.startsWith(s.getOrigin()))?.getOrigin() ?? '';
    if (!key) {
      return;
    }
    this.states[key].update(beingLoaded);
  }

  getStateByKey(key: string): State<boolean> {
    return this.states[key];
  }
}
