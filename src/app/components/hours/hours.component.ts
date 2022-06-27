import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Hour } from 'src/app/model/hour.model';

@Component({
  selector: 'app-hours[hours]',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements AfterViewInit {
  @Input() hours: Hour[];
  @ViewChild('slider') slider: ElementRef;

  ngAfterViewInit(): void {
    this.slider.nativeElement.scrollLeft += 500;
    console.log(this.slider.nativeElement);
  }

  iconSrc(hour: Hour): string {
    return `../../../assets/icons/${hour.decoration}.svg`;
  }

  click(): void {
    this.slider.nativeElement.scrollLeft += 110;
  }
}
