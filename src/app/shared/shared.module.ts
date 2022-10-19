import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CustomModalComponent } from "./custom-modal/custom-modal.component";
import { CustomMobileDirective } from "./modal.directive";

@NgModule({
    declarations:[
        CustomModalComponent,
        CustomMobileDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        CustomModalComponent,
        CustomMobileDirective,
        CommonModule
    ]
})
export class SharedModule {}