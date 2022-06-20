import { formatDate } from '@angular/common';
import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { Temperature } from 'src/app/model/temperature.model';
import { Weather } from 'src/app/model/weather.model';

@Component({
  selector: 'app-today[city][weather]',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit, AfterContentChecked {
  @Input() city: string;
  @Input() weather: Weather[];

  time: string;
  temp: Temperature;
  iconSrc: string;
  description: string;

  ngOnInit(): void {
    const time = (): void => {
      this.time = formatDate(new Date, 'HH : mm cccc', 'en-US');
    };
    time();
    setInterval(time, 10_000);
  }

  ngAfterContentChecked(): void {
    if (!this.weather) {
      return;
    }
    const hours = new Date().getHours();
    this.iconSrc = `../../../assets/icons/${this.weather[hours].decoration}.svg`;
    this.description = this.weather[hours].description;
    this.temp = {
      min: Math.min(...this.weather.map(w => w.temp)),
      max: Math.max(...this.weather.map(w => w.temp)),
      current: this.weather[hours].temp
    };
  }
}
