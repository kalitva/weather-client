import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-today[city]',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  @Input() city: string;

  time: string;

  ngOnInit(): void {
    const time = (): void => { this.time = formatDate(new Date, 'HH : mm cccc', 'en-US'); };
    time();
    setInterval(time, 10_000);
  }
}
