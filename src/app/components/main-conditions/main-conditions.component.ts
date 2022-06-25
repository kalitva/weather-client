import { AfterContentChecked, Component, Input } from '@angular/core';
import { CurrentConditions } from 'src/app/model/current-conditions.model';
import { Temperature } from 'src/app/model/temperature.model';

@Component({
  selector: 'app-main-conditions[currentConditions]',
  templateUrl: './main-conditions.component.html',
  styleUrls: ['./main-conditions.component.css']
})
export class MainConditionsComponent implements AfterContentChecked {
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
