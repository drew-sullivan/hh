import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { CurrencyService } from './services/currency-service.service';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'user-manager', loadChildren: './user-manager/user-manager.module#UserManagerModule' },
  { path: '**', redirectTo: 'user-manager' }
];

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    RouterModule.forRoot(routes)
  ],
  providers: [ CurrencyService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
