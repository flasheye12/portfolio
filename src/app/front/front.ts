import {Component, ElementRef} from '@angular/core';

@Component({
    selector: 'section[front]',
    template: require('./front.html')
})
export class Front {
    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef.nativeElement;
    }
}
