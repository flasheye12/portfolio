import {Component, ElementRef} from '@angular/core';

@Component({
  selector: '[front]',
  template: require('./front.html')
})
export class Front {
  elementRef: ElementRef;
  dotsText: DotsText;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  ngAfterContentInit() {
    var nativeElement = this.elementRef.nativeElement;

    this.dotsText = new DotsText(
      nativeElement,
      nativeElement.querySelectorAll('#canvas-dots')[0],
      nativeElement.querySelectorAll('#canvas-text')[0]
    );
  }
}

class DotsText {
  stage: any;
  dotsStage: any;
  dotsStageCtx: any;

  textStage: any;
  textStageCtx: any;

  dotsStageWidth: number;
  dotsStageHeight: number;
  dotsStageCenterX: number;
  dotsStageCenterY: number;

  textStageWidth: number;
  textStageHeight: number;
  textStageOffsetX: number;
  textStageOffsetY: number;

  countdownFrom: number;
  countdownTimer: number;
  countdownRunning: boolean;

  dots: Dot[];
  colors: string[];
  numberPixelCoordinates: Object[];
  circleRadius: number;

  constructor(stage: any, dotsElement: any, canvasElement: any) {
    let timerResize;

    this.stage = stage;

    this.dotsStage = dotsElement;
    this.dotsStageCtx = dotsElement.getContext('2d');

    this.textStage = canvasElement;
    this.textStageCtx = canvasElement.getContext('2d');

    this.countdownFrom = 10;
    this.countdownTimer = 2800;
    this.countdownRunning = true;

    this.dots = [];
    this.colors = ['61, 207, 236', '255, 244, 174', '255, 211, 218', '151, 211, 226'];
    this.numberPixelCoordinates = [];
    this.circleRadius = 2;

    window.addEventListener('resize', () => {
      clearTimeout(timerResize);
      timerResize = setTimeout(this.init.bind(this), 100);
    });

    this.init();
    this.loop();
  }

  init() {
    let minDotsCount;

    this.initSize();
    minDotsCount = this.setTexts([
      {
        text: 'I am a',
        font: 'bold 82px Lato',
        x: this.dotsStageWidth / 2,
        y: 130
      },
      {
        text: 'FE Developer',
        font: 'bold 118px Lato',
        x: this.dotsStageWidth / 2,
        y: 260
      },
      {
        text: '&',
        font: 'bold 82px Lato',
        x: this.dotsStageWidth / 2,
        y: 380,
      },
      {
        text: 'HTML CSS',
        font: 'bold 82px Lato',
        x: this.dotsStageWidth / 2,
        y: 500,
      },
      {
        text: 'ECMAScript',
        font: 'bold 82px Lato',
        x: this.dotsStageWidth / 2,
        y: 580,
      },
      {
        text: 'Angular',
        font: 'bold 82px Lato',
        x: this.dotsStageWidth / 2,
        y: 660,
      },
      {
        text: 'Specialist',
        font: 'bold 82px Lato',
        x: this.dotsStageWidth / 2,
        y: 740,
      }
    ]);
    this.initDraw(minDotsCount + 50);
    this.drawText();
  }

  initSize() {
    let boundingClientRect = this.stage.getBoundingClientRect();

    this.dotsStageWidth = this.dotsStage.width = boundingClientRect.width;
    this.dotsStageHeight = this.dotsStage.height = boundingClientRect.height;
    this.dotsStageCenterX = this.dotsStageWidth / 2;
    this.dotsStageCenterY = this.dotsStageHeight / 2;

    this.textStageWidth = this.textStage.width = this.dotsStageWidth;
    this.textStageHeight = this.textStage.height = this.dotsStageHeight;
    this.textStageOffsetX = (this.dotsStageWidth - this.textStageWidth) / 2;
    this.textStageOffsetY = (this.dotsStageHeight - this.textStageHeight) / 2;
  }

  initDraw(maxDotCount) {
    this.dots.length = 0;

    for (let i = 0; i < maxDotCount; i++) {
      let dot = new Dot(
        this.dotsStageCtx,
        {
          x: this.randomNumber(0, this.dotsStageWidth),
          y: this.randomNumber(0, this.dotsStageHeight),
          color: this.colors[this.randomNumber(1, this.colors.length)],
          alpha: .3,
          circleRadius: this.circleRadius
        }
      );

      this.dots.push(dot);

      this.animateDot(dot, '', 'space');
    }
  }

  loop() {
    this.dotsStageCtx.clearRect(0, 0, this.dotsStageWidth, this.dotsStageHeight);

    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].draw();
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  setTexts(texts) {
    let dotCounts = 0;
    let imageData;

    this.textStageCtx.clearRect(0, 0, this.textStageWidth, this.textStageHeight);

    this.textStageCtx.fillStyle = '#24282f';
    this.textStageCtx.textAlign = 'center';

    for (let i = 0; i < texts.length; i++) {
      if (texts[i].text) {
        this.textStageCtx.font = texts[i].font;
        this.textStageCtx.fillText(texts[i].text, texts[i].x, texts[i].y);
      }
    }    

    imageData = this.textStageCtx.getImageData(0, 0, this.textStageWidth, this.textStageHeight).data;
    this.numberPixelCoordinates.length = 0;

    for (let i = imageData.length; i >= 0; i -=4) {
      if (imageData[i] !== 0) {
        let x = (i / 4) % this.textStageWidth;
        let y = Math.floor(Math.floor(i / this.textStageWidth) / 4);

        if ((x && x % (this.circleRadius * 2 + 3) === 0) && 
            (y && y % (this.circleRadius * 2 + 3) === 0)) {
          this.numberPixelCoordinates.push({
            x: x,
            y: y
          });

          dotCounts++;
        }
      }
    }

    console.log('dotCounts ::: ', dotCounts);
    return dotCounts; 
  }

  drawText() {
    for (let i = 0; i < this.numberPixelCoordinates.length; i++) {
      this.animateDot(this.dots[i], this.numberPixelCoordinates[i]);
    }
  }

  breakText() {
    for (let i = 0; i < this.numberPixelCoordinates.length; i++) {
      this.animateDot(this.dots[i], '', 'space');
    }
  }

  animateDot(dot, pos, type='') {
    var that = this;

    if (type === 'space') {
      window['TweenLite'].to(dot, (3 + Math.round(Math.random() * 100) / 100), {
        x: that.randomNumber(0, that.dotsStageWidth),  
        y: that.randomNumber(0, that.dotsStageHeight),
        alpha: .3,
        ease: (t) => {return (--t)*t*t+1;},
        onComplete: () => that.animateDot(dot, '', 'space')
      });
    } else {
      window['TweenLite'].to(dot, (1.5 + Math.round(Math.random() * 100) / 100), {
        x: pos.x + this.textStageOffsetX,
        y: pos.y + this.textStageOffsetY,
        delay: 0,
        alpha: 1,
        ease: (t) => {return (--t)*t*t+1;},
      });
    }
  }

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

class Dot {
  dotsStageCtx: any;

  x: number;
  y: number;
  color: string;
  alpha: number;

  circleRadius: number;

  constructor(dotsStageCtx: any, option: any) {
    this.dotsStageCtx = dotsStageCtx;

    this.x = option.x;
    this.y = option.y;
    this.color = option.color;
    this.alpha = option.alpha;
    this.circleRadius = option.circleRadius;
  }

  draw() {
    this.dotsStageCtx.beginPath();
    this.dotsStageCtx.arc(this.x, this.y, this.circleRadius, 0, 2 * Math.PI, false);
    this.dotsStageCtx.fillStyle = 'rgba(' + this.color + ', ' + this.alpha + ')';
    this.dotsStageCtx.fill();
  }
}
