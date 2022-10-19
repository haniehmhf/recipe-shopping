import { Component, ViewChild, ViewContainerRef } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../interfaces/IUser.modal";
import { RecpieService } from "../recipes/recpie.service";
import { CustomModalComponent } from "../shared/custom-modal/custom-modal.component";
import { CustomMobileDirective } from "../shared/modal.directive";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    isLogin: boolean;
    destroy$ = new Subject()
    @ViewChild(CustomMobileDirective,{static:false}) view:CustomMobileDirective;
    constructor(
        private recipeService: RecpieService,
        private authService: AuthService
    ) {
        this.authService.user$.asObservable()
            .subscribe((user: User) => this.isLogin = !!user)
    }

    sendDate() {
        this.recipeService.saveRecpies()
    }

    getData() {
        this.recipeService.fetchRecipes().subscribe()
    }

    logout() {
        this.handleModal();
    }

    handleModal() {
        const vr = this.view.viewContainerRef
        vr.clear()
        const dc = vr.createComponent(CustomModalComponent);
        dc.instance.message = 'Are you want to logout?'
        dc.instance.confirm.pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.authService.logout();
                vr.clear()
            })
        dc.instance.close.pipe(takeUntil(this.destroy$))
            .subscribe(() => vr.clear())   
    }

    ngOnDestroy() {
        this.view.viewContainerRef.clear()
        this.destroy$.next('')
    }
}