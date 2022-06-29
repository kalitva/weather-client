import { AfterContentChecked, Component, Input } from '@angular/core';
import { CurrentConditions } from 'src/app/model/current-conditions.model';

@Component({
  selector: 'app-main-conditions[currentConditions]',
  templateUrl: './main-conditions.component.html',
  styleUrls: ['./main-conditions.component.css']
})
export class MainConditionsComponent implements AfterContentChecked {
  @Input() currentConditions: CurrentConditions;

  iconSrc: string;

  ngAfterContentChecked(): void {
    if (!this.currentConditions) {
      return;
    }
    this.iconSrc = `../../../assets/icons/${this.currentConditions.icon}.svg`;
  }
}
