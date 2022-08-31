import { Inject, Injectable } from '@angular/core';
import { ORIGIN_AWARES } from '../app.module';
import { OriginAware } from '../services/origin-aware';
import { State } from './state';

@Injectable({ providedIn: 'root' })
export class LoadingStateManager {
  private states: { [key: string]: State<boolean> };

  constructor(@Inject(ORIGIN_AWARES) private services: OriginAware[]) {
    this.states = {};
    services.forEach(s => {
      this.states[s.getOrigin()] = new class extends State<boolean> {};
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
