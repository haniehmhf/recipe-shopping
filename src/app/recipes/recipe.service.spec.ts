import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing";
import { State, StateObservable, Store, StoreModule } from "@ngrx/store";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { BASE_URL } from "../app.module";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { AppState } from "../store";
import { CustomStore, CustomStateObservable } from "../store/store";
import { RecpieService } from "./recpie.service"

class MocStore extends Store<AppState> {}

describe('Redcipe Service Test', () => {
    let service:RecpieService;
    let subscribtion:Subscription;
    beforeEach(async() => {
        if(subscribtion) subscribtion.unsubscribe()
        await TestBed.configureTestingModule({
            providers:[
                RecpieService,
                ShoppingListService,
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
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                StoreModule.forRoot({}, {}),
            ]
        }).compileComponents()

        service = TestBed.inject(RecpieService)
    })

    it('Recipe Service was created',() => {
        expect(service).toBeDefined()
    })
})

