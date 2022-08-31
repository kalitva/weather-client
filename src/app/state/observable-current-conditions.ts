import { Injectable } from '@angular/core';
import { CurrentConditions } from '../model/current-conditions.model';
import { State } from './state';

@Injectable({ providedIn: 'root' })
export class ObservableCurrentConditions extends State<CurrentConditions> {}
