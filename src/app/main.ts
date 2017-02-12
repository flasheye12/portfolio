import {Component, ViewChild, HostListener} from '@angular/core';
import {Contact} from './contact/contact';
import {Evelope} from './evelope/evelope';
import {Experience} from './experience/experience';
import {Front} from './front/front';
import {Writing} from './writing/writing';


@Component({
  selector: '[fountain-app]',
  template: require('./main.html')
})
export class MainComponent {
    @ViewChild(Contact) contact: Contact;
    @ViewChild(Evelope) evelope: Evelope;
    @ViewChild(Experience) experience: Experience;
    @ViewChild(Front) front: Front;
    @ViewChild(Writing) writing: Writing;


    ngOnInit() {
        console.log('ng on init ::: ', this.experience.elementRef);
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event) {

        console.log('scroll ::: ', event.target.body.scrollTop);
    }
}
