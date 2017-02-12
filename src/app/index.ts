import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

import {MainComponent} from './main';
import {Header} from './header';
import {Contact} from './contact/contact';
import {Evelope} from './evelope/evelope';
import {Experience} from './experience/experience';
import {Front} from './front/front';
import {Writing} from './writing/writing';
import {Footer} from './footer';

@NgModule({
  imports: [
    Ng2PageScrollModule.forRoot(),
    BrowserModule,
    routing
  ],
  declarations: [
    RootComponent,
    MainComponent,
    Header,
    Contact,
      Evelope,
      Experience,
      Front,
      Writing,
    Footer
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
