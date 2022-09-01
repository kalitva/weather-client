import { Component, OnInit } from '@angular/core';
import { CurrentConditions } from 'src/app/model/current-conditions.model';
import { ObservableCurrentConditions } from 'src/app/state/observable-current-conditions';
import { uvIndexScale } from 'src/app/util/measure-util';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  currentConditions: CurrentConditions;

  constructor(private observableCUrrentConditions: ObservableCurrentConditions) {}

  ngOnInit(): void {
    this.observableCUrrentConditions.onChange(cc => this.currentConditions = cc);
  }

  uvIndexScale(uvIndex: number | undefined): string {
    return uvIndexScale(uvIndex ?? 0);
  }
}
