import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherApiService } from './services/weather-api.service';
import { VisualCrossingWeatherApiService } from './services/visual-crossing-weather-api.service';
import { CacheHttpInterceptor } from './interceptors/cache-http.interceptor';
import { TodayComponent } from './components/today/today.component';
import { GeolocationService } from './services/geolocation.service';
import { TrueWayGeolocationService } from './services/true-way-geo-location.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    TopBarComponent,
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
