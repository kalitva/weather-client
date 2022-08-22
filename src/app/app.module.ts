import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherApiService } from './services/weather-api.service';
import { VisualCrossingWeatherApiService } from './services/visual-crossing-weather-api.service';
import { CacheHttpInterceptor } from './interceptors/cache-http.interceptor';
import { GeolocationService } from './services/geolocation.service';
import { TrueWayGeolocationService } from './services/true-way-geo-location.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { CurrentConditionsComponent } from './components/current-conditions/current-conditions.component';
import { HoursComponent } from './components/hours/hours.component';
import { DaysComponent } from './components/days/days.component';
import { FormsModule } from '@angular/forms';
import { ResponseLoadingStateInterceptor } from './interceptors/response-loading-state.interceptor';
import { CitySearchService } from './services/city-search.service';
import { SpottCitySearchService } from './services/spott-city-search.service';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CurrentConditionsComponent,
    HoursComponent,
    DaysComponent,
    ErrorAlertComponent,
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
    { provide: CitySearchService, useClass: SpottCitySearchService },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseLoadingStateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
