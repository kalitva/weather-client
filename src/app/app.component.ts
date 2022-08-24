import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingState } from './state/loading-state';
import { ObservableCity } from './state/observable-city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  beingLoaded: boolean;

  constructor(
    private loadingState: LoadingState,
    private observableCity: ObservableCity,
    private title: Title,
  ) {
    this.beingLoaded = true;
  }

  ngOnInit(): void {
    this.observableCity.onChanged(c => this.title.setTitle(`Weather – ${c}`));
    this.loadingState.onChange(bl => this.beingLoaded = bl);
  }
}
