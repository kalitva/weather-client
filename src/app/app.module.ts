import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayWeatherBannerComponent } from './components/weather-banner/day-weather-banner.component';
import { CurrentWeatherBannerComponent } from './components/weather-banner/current-weather-banner.component';

@NgModule({
  declarations: [
    AppComponent,
		DayWeatherBannerComponent,
		CurrentWeatherBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
