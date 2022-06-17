import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherApiService } from './services/weather-api.service';
import { VisualCrossingWeatherApiService } from './services/visual-crossing-weather-api.service';
import { CacheHttpInterceptor } from './interceptors/cache-http.interceptor';
import { TodayComponent } from './components/today/today.component';

@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: WeatherApiService, useClass: VisualCrossingWeatherApiService },
    { provide: HTTP_INTERCEPTORS, useClass: CacheHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
