import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar[city]',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @Input() city: string;

  time: string;

  ngOnInit(): void {
    this.time = formatDate(new Date, 'HH:mm cccc', 'en-US');
  }
}
