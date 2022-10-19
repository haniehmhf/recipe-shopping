import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StateObservable, State, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { BASE_URL } from 'src/app/app.module';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { AppState } from 'src/app/store';
import {  CustomStateObservable } from 'src/app/store/store';
import { environment } from 'src/environments/environment';
import { RecpieService } from '../recpie.service';

import { RecipeEditComponent } from './recipe-edit.component';

class MocStore extends Store<AppState> {}

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}, {}),
      ],
      providers: [
        ShoppingListService,
        { provide: BASE_URL,
          useValue: environment.baseUrl
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 1})
          }
        },
        RecpieService,
        {
          provide: '',
          useValue: {
            sanitize: () => 'https://www.thespruceeats.com/thmb/CbsD3vAtQv0l2Pm6IhUlQ5k33U0=/3000x2000/filters:fill(auto,1)/murg-malai-kabab-1957372-Hero_01-bb66c49fd80e4b95b26a6fdd68bd7a7d.jpg',
            bypassSecurityTrustUrl: () => 'https://www.thespruceeats.com/thmb/CbsD3vAtQv0l2Pm6IhUlQ5k33U0=/3000x2000/filters:fill(auto,1)/murg-malai-kabab-1957372-Hero_01-bb66c49fd80e4b95b26a6fdd68bd7a7d.jpg'
          }
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
      .compileComponents();

    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Recipe Edit should create', () => {
    expect(component).toBeTruthy();
  });
});
