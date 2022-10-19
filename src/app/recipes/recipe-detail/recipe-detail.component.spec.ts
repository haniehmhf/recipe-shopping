import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Store, StateObservable, State, StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { BASE_URL } from "src/app/app.module";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { AppState } from "src/app/store";
import { CustomStateObservable } from "src/app/store/store";
import { environment } from "src/environments/environment";
import { RecpieService } from "../recpie.service";
import { RecipeDetailComponent } from "./recipe-detail.component";
class MocStore extends Store<AppState> {}

describe('Recipe Detail Test',() => {
    let recipeService:RecpieService;
    let component : RecipeDetailComponent
    let fixture: ComponentFixture<RecipeDetailComponent>;
    let router:ActivatedRoute;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecipeDetailComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                StoreModule.forRoot({}, {}),
            ],
            providers: [
              {
                provide: ActivatedRoute,
                useValue: {
                  params: of({id: 1})
                }
              },
              { provide: BASE_URL,
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
              },
              RecpieService,
              ShoppingListService,
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents()

        router = TestBed.inject(ActivatedRoute)
        fixture = TestBed.createComponent(RecipeDetailComponent)
        recipeService = TestBed.inject(RecpieService)
        component = fixture.componentInstance
        fixture.detectChanges();
    })

    it('Recipe Detail should create', () => {
        expect(component).toBeTruthy();
    });

    it('If router param is exist:',function(done:DoneFn) {
        fixture.detectChanges();
        router.params.subscribe((param:any) => {
            if(component.selectedRecpie)
                expect(recipeService.recpies[+param].name).toEqual(component.selectedRecpie.name)
            done()    
        })
    })
      
})  
