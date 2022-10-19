import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations:[AuthComponent],
    imports:[
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    exports:[
        AuthComponent,
    ]
})
export class AuthModule { }