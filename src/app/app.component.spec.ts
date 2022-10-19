import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { State, StateObservable, Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { BASE_URL } from './app.module';
import { AuthComponent } from './auth/auth.component';
import { DataInterceptor } from './interceptors/http.interceptor.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppState } from './store';
import { CustomStateObservable } from './store/store';

class MocStore extends Store<AppState> {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>
  const appRoutes: Routes = [
    { path: '', redirectTo: '/recpies', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'recpies', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping.module').then(m => m.ShoppingModule) },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        HttpClientTestingModule,
        SharedModule,
      ],
      providers: [
        ShoppingListService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DataInterceptor,
          multi: true
        },
        {
          provide: BASE_URL,
          useValue: environment.baseUrl
        },
        {
          provide: Store,
          useClass: MocStore
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
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('App Compponent should created', () => {
    expect(component).toBeTruthy();
  })
});
