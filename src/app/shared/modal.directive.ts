import { Directive, ElementRef, HostBinding, HostListener, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[modalMessage]'
})
export class CustomMobileDirective {
    constructor(
        public viewContainerRef: ViewContainerRef,
    ) { }
}