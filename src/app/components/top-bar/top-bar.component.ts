import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObservableCity } from 'src/app/state/observable-city';
import { datetimeByTimezoneOffset } from 'src/app/util/datetime-util';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Router } from '@angular/router';
import { ObservableCurrentConditions } from 'src/app/state/observable-current-conditions';
import { CurrentConditions } from 'src/app/model/current-conditions.model';
import { LoadingStateManager } from 'src/app/state/loading-state-manager';
import { CityAutocompleteComponent } from '../city-autocomplete/city-autocomplete.component';

const DELAY_BEFORE_CLOSE_INPUT = 300;

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @ViewChild('city_autocomplete') cityAutocomplete: CityAutocompleteComponent;
  @ViewChild('input_city') inputCity: ElementRef;

  city: string;
  time: string;
  currentConditions: CurrentConditions;
  showInput: boolean;
  cityBeingLoaded: boolean;

  constructor(
    private geolocationService: GeolocationService,
    private router: Router,
    private observableCity: ObservableCity,
    private observableCurrentConditions: ObservableCurrentConditions,
    private loadingStateManager: LoadingStateManager,
  ) {}

  ngOnInit(): void {
    this.observableCity.onChange(c => {
      this.showInput = false;
      this.city = c;
    });
    this.observableCurrentConditions.onChange(cc => {
      this.currentConditions = cc;
      this.time = formatDate(datetimeByTimezoneOffset(cc.timezone.offset), 'HH:mm cccc', 'en-US');
    });
    this.loadingStateManager.getStateByKey(this.geolocationService.getOrigin())
      .onChange(bl => this.cityBeingLoaded = bl);
  }

  navigateToCity(city: string): void {
    if (city) {
      this.router.navigate([], { queryParams: { city } });
    }
  }

  // TODO fix - this permits only the latin symbols
  restrictChars(event: KeyboardEvent): boolean {
    return /[\w|\-|\s]/.test(event.key);
  }

  setSuggestion(city: string): void {
    this.inputCity.nativeElement.value = city;
  }

  closeInput(): void {
    setTimeout(() => { // to be able click on autocomplete elem before input is closed
      this.showInput = false;
      this.cityAutocomplete.clear();
    }, DELAY_BEFORE_CLOSE_INPUT);
  }
}
