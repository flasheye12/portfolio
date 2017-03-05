import {Component, ElementRef} from '@angular/core';

@Component({
    selector: '[evelope]',
    template: require('./evelope.html')
})
export class Evelope {
    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef.nativeElement;
    }
}
