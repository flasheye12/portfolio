import {Component, ViewChild, HostListener, ElementRef} from '@angular/core';
import {Evelope} from './evelope/evelope';
import {Experience} from './experience/experience';
import {Front} from './front/front';

@Component({
  selector: '[fountain-app]',
  template: require('./main.html')
})
export class MainComponent {
  @ViewChild(Front) front: Front;
  @ViewChild(Experience) experience: Experience;
  @ViewChild(Evelope) evelope: Evelope;

  elementRef: ElementRef;
  pageElements: any[];
  totalSlideNumber: number;
  currentSlideNumber: number;
  ticking: boolean;
  sildeDuration: number;
  activeIndex: number;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;

    this.totalSlideNumber = 3;
    this.currentSlideNumber = 0;
    this.ticking = false;
    this.sildeDuration = 600;
    this.activeIndex = 0;

    window.onload = () => {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf("MSIE ");

      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        alert('본 페이지는 인터넷 익스프롤러를 제외한 크롬, 파이어폭스, 엣지에서 원할하게 동작합니다.');
      }
    }
  }

  ngAfterContentInit() {
    this.pageElements = this.elementRef.nativeElement.querySelectorAll('.page');
  }

  prevItem(hasDuration=true) {
    if (!this.ticking) {
      this.ticking = true;
      if (this.currentSlideNumber !== 0) {
        this.currentSlideNumber--;
        this.activeIndex = this.currentSlideNumber;
      }
      this._prevItem();
      hasDuration ? this.slideDurationTimeout(this.sildeDuration) : (this.ticking = false);
    }
  }

  nextItem(hasDuration=true) {
    if (!this.ticking) {
      this.ticking = true;
      if (this.currentSlideNumber !== this.totalSlideNumber - 1) {
        this.currentSlideNumber++;
        this.activeIndex = this.currentSlideNumber;  
        this._nextItem();
      }
      hasDuration ? this.slideDurationTimeout(this.sildeDuration) : (this.ticking = false);
    }
  }

  activeItem(index) {
    let compare;

    if (this.activeIndex !== index) {
      compare = index - this.activeIndex;
      if (compare > 0) {
        for(let i = 0; i < compare; i++) {
          this.nextItem(false);
        }
      } else {
        for(let i = 0; i > compare; i--) {
          this.prevItem(false);
        }
      }
    }
  }

  slideDurationTimeout(slideDuration) {
    setTimeout(() => this.ticking = false, slideDuration);
  }

  _nextItem() {
    let prevSlide = this.pageElements[this.currentSlideNumber - 1];

    if (prevSlide) {
      prevSlide.classList.remove('up-scroll');
      prevSlide.classList.add('down-scroll');
    }
  }

  _prevItem() {
    let currentSlide = this.pageElements[this.currentSlideNumber];

    if (currentSlide) {
      currentSlide.classList.remove('down-scroll');
      currentSlide.classList.add('up-scroll');
    }
  }
}
