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
import { BackgroundService } from './services/background.service';
import { UnplashBackgroundService } from './services/unplash-background.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CurrentConditionsComponent,
    HoursComponent,
    DaysComponent,
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
    { provide: BackgroundService, useClass: UnplashBackgroundService },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseLoadingStateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
