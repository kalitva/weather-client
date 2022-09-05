import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherApiService } from './services/weather-api.service';
import { VisualCrossingWeatherApiService } from './services/impl/visual-crossing-weather-api.service';
import { CacheHttpInterceptor } from './interceptors/cache-http.interceptor';
import { GeolocationService } from './services/geolocation.service';
import { TrueWayGeolocationService } from './services/impl/true-way-geo-location.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { CurrentConditionsComponent } from './components/current-conditions/current-conditions.component';
import { HoursComponent } from './components/hours/hours.component';
import { DaysComponent } from './components/days/days.component';
import { FormsModule } from '@angular/forms';
import { ResponseLoadingStateInterceptor } from './interceptors/response-loading-state.interceptor';
import { CitySearchService } from './services/city-search.service';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { CityAutocompleteComponent } from './components/city-autocomplete/city-autocomplete.component';
import { GeoapifyCitySearchService } from './services/impl/geoapify-city-search.service';
import { BackgroundComponent } from './components/background/background.component';
import { OriginAware } from './services/origin-aware';
import { DetailsComponent } from './components/details/details.component';
import { TimOutInterceptor } from './interceptors/tim-out.interceptor';

export const ORIGIN_AWARES = new InjectionToken<OriginAware>('OriginAware');

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CurrentConditionsComponent,
    HoursComponent,
    DaysComponent,
    ErrorAlertComponent,
    CityAutocompleteComponent,
    BackgroundComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: WeatherApiService, useClass: VisualCrossingWeatherApiService },
    { provide: GeolocationService, useClass: TrueWayGeolocationService },
    { provide: CitySearchService, useClass: GeoapifyCitySearchService },
    { provide: ORIGIN_AWARES, useClass: VisualCrossingWeatherApiService, multi: true },
    { provide: ORIGIN_AWARES, useClass: TrueWayGeolocationService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseLoadingStateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimOutInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
