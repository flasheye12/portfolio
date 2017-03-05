import {Component, ElementRef} from '@angular/core';

@Component({
    selector: '[experience]',
    template: require('./experience.html')
})
export class Experience {
    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef.nativeElement;
    }
}
