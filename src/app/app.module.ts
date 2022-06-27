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
import { MainConditionsComponent } from './components/main-conditions/main-conditions.component';
import { HoursComponent } from './components/hours/hours.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MainConditionsComponent,
    HoursComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: WeatherApiService, useClass: VisualCrossingWeatherApiService },
    { provide: GeolocationService, useClass: TrueWayGeolocationService },
    { provide: HTTP_INTERCEPTORS, useClass: CacheHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
