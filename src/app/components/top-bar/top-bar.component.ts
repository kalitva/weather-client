import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObservableCity } from 'src/app/logic/observable-city';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  city: string;
  time: string;

  constructor(private geolocationService: GeolocationService, private observableCity: ObservableCity) {
  }

  ngOnInit(): void {
    // TODO in different cities show time according time zone
    this.time = formatDate(new Date, 'HH:mm cccc', 'en-US');
    // TODO doesn't work when browser asks to allow getting location
    // TODO handle errors
    this.geolocationService.detectCity().subscribe(c => {
      this.city = c;
      this.observableCity.update(c);
    });
  }
}
