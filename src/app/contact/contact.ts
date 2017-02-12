import {Component, ElementRef} from '@angular/core';

@Component({
    selector: 'section[contact]',
    template: require('./contact.html')
})
export class Contact {
    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef.nativeElement;
    }
}
