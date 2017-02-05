import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';

//import {TechsModule} from './techs';

import {MainComponent} from './main';
//import {Header} from './header';
//import {Footer} from './footer';

import {Front} from './front/front';
import {Experience} from './experience/experience';
import {Contact} from './contact/contact';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    //TechsModule
  ],
  declarations: [
    RootComponent,
    MainComponent,
    //Header,
    //Footer,
    //HeaderComponent,
    //TitleComponent,
    //FooterComponent,
    Front,
    Experience,
    Contact
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
