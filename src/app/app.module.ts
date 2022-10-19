import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataInterceptor } from './interceptors/http.interceptor.service';

import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RecpieService } from './recipes/recpie.service';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { State, StateObservable, Store, StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { CustomStateObservable, CustomStore } from './store/store';
export const BASE_URL = new InjectionToken<string>('');
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DataInterceptor,
      multi: true
    },
    {
      provide: Store,
      useExisting: CustomStore
    },
    {
      provide: BASE_URL,
      useValue: environment.baseUrl 
    },
    {
      provide: StateObservable,
      useExisting: CustomStateObservable
    },
    {
      provide: CustomStateObservable,
      useExisting: State
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
