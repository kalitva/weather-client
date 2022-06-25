import { AfterContentChecked, Component, Input } from '@angular/core';
import { CurrentConditions } from 'src/app/model/current-conditions.model';
import { Temperature } from 'src/app/model/temperature.model';

@Component({
  selector: 'app-today[city][currentConditions]',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements AfterContentChecked {
  @Input() city: string;
  @Input() currentConditions: CurrentConditions;

  temp: Temperature;
  iconSrc: string;

  ngAfterContentChecked(): void {
    if (!this.currentConditions) {
      return;
    }
    const hours = new Date().getHours();
    this.iconSrc = `../../../assets/icons/${this.currentConditions.decoration}.svg`;
    this.temp = {
      min: Math.min(...this.currentConditions.hours.map(w => w.temp)),
      max: Math.max(...this.currentConditions.hours.map(w => w.temp)),
      current: this.currentConditions.hours[hours].temp
    };
  }
}
