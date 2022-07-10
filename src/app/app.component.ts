import { Component } from '@angular/core';
import { timeOfDay } from './logic/util';
import { Decoration } from './model/decoration.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  backgroundImagePath: string;
  visorColorClass: string;

  updateDecoration(decoration: Decoration): void {
    this.backgroundImagePath = `url(assets/bg/${timeOfDay()}/${decoration}.jpg)`;
    this.visorColorClass = `visor-color-${decoration}`;
  }
}
