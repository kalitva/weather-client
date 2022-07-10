import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ObservableCity } from 'src/app/logic/observable-city';
import { CurrentConditions } from 'src/app/model/current-conditions.model';
import { Decoration } from 'src/app/model/decoration.enum';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {
  @Output() conditionsChanged: EventEmitter<Decoration>;

  currentConditions: CurrentConditions;
  iconSrc: string;

  constructor(private weatherApiService: WeatherApiService, private observableCity: ObservableCity) {
    this.conditionsChanged = new EventEmitter();
  }

  ngOnInit(): void {
    this.observableCity.onChanged(c => {
      this.weatherApiService.currentConditions(c).subscribe(cc => {
        this.currentConditions = cc;
        this.iconSrc = `assets/icons/${cc.icon}.svg`;
        this.conditionsChanged.emit(cc.decoration);
      });
    });
  }
}
