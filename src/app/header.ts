import {Component} from '@angular/core';
import {PageScrollConfig} from 'ng2-page-scroll';
// import {PageScrollInstance, PageScrollService, EasingLogic} from 'ng2-page-scroll';

@Component({
  selector: 'header[portfolio-header]',
  template: require('./header.html')
})
export class Header {
	constructor() {
		// PageScrollConfig.defaultScrollOffset = 50;
        PageScrollConfig.defaultEasingLogic = {
            ease: (t: number, b: number, c: number, d: number): number => {
                // easeInOutExpo easing 
                if (t === 0) return b;
                if (t === d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        };
	}
	
	doSmth(reachedTarget: Object): void {
		console.log('dosmth ::: ', arguments);
	}
}
