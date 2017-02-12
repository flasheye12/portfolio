import {Component, ElementRef} from '@angular/core';

@Component({
    selector: 'section[writing]',
    template: require('./writing.html')
})
export class Writing {
    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef.nativeElement;
    }
}
