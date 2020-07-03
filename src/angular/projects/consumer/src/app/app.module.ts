import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RacingBarsModule } from 'racing-bars';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RacingBarsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
