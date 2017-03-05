import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

import {MainComponent} from './main';
import {Front} from './front/front';
import {Experience} from './experience/experience';
import {Evelope} from './evelope/evelope';

import { MouseWheelDirective } from './util/mousewheel.directive';

@NgModule({
  imports: [
    Ng2PageScrollModule.forRoot(),
    BrowserModule,
    routing
  ],
  declarations: [
    RootComponent,
    MainComponent,
    Front,
    Experience,
    Evelope,
    MouseWheelDirective
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
