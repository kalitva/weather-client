import { Inject, Injectable } from '@angular/core';
import { ORIGINS } from '../app.module';
import { Origin } from '../services/origin';
import { State } from './state';

@Injectable({ providedIn: 'root' })
export class LoadingStateManager {
  private states: { [key: string]: State<boolean> };

  constructor(@Inject(ORIGINS) private services: Origin[]) {
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
