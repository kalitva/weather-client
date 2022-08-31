import { Injectable } from '@angular/core';
import { State } from './state';

@Injectable({ providedIn: 'root' })
export class ObservableCity extends State<string> {}
