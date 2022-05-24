import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[red]'
})
export class RedDirective {
    constructor(private _elementRef: ElementRef) {
        this._elementRef.nativeElement.style.color = 'tomato';
    }
}
