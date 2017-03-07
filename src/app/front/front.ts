import {Component, ElementRef} from '@angular/core';

@Component({
  selector: '[front]',
  template: require('./front.html')
})
export class Front {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  ngAfterViewInit() {
    this.initDotText();    
  }

  initDotText() { 
    let nativeElement = this.elementRef.nativeElement;
    let dotsText = new DotsText(
      nativeElement.querySelectorAll('#canvas-dots')[0],
      nativeElement.querySelectorAll('#canvas-text')[0], 
      {
        maxDotCount: 1900,
        getClientRect: () => {
          return {
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        colors: [
          '255, 179, 186',
          '255, 223, 186',
          '255, 255, 186',
          '186, 255, 201',
          '186, 225, 255'
        ],
        background: '#5C3A58'
      }
    );
    let centerX = () => {return window.innerWidth / 2};
    let centerY = () => {return window.innerHeight / 2};
    let scenario = [
      {
        time: 5000,
        image: {
          src: '/assets/images/my_face.png',
          scale: {
            x: 2,
            y: 2
          },
          x: centerX,
          y: centerY
        }
      },
      {
        time: 10
      },
      {
        time: 5000,
        texts: [
          {
            text: 'I AM A',
            font: 'bold 90px Lato',
            x: centerX,
            y: () => {return centerY() - 100;}
          },
          {
            text: 'FRONT-END',
            font: 'bold 90px Lato',
            x: centerX,
            y: centerY
          },
          {
            text: 'DEVELOPER',
            font: 'bold 90px Lato',
            x: centerX,
            y: () => {return centerY() + 100;}
          }
        ]
      },
      {
        time: 10
      },
      {
        time: 5000,
        texts: [
          {
            text: 'HTML CSS',
            font: 'bold 82px Lato',
            x: centerX,
            y: () => {return centerY() - 150;}
          },
          {
            text: 'ECMASCRIPT',
            font: 'bold 82px Lato',
            x: centerX,
            y: () => {return centerY() - 50;}
          },
          {
            text: 'ANGULAR',
            font: 'bold 82px Lato',
            x: centerX,
            y: () => {return centerY() + 50;}
          },
          {
            text: 'SPECIALIST',
            font: 'bold 82px Lato',
            x: centerX,
            y: () => {return centerY() + 150;}
          }
        ]
      },
      {
        time: 10
      }, 
      {
        time: 7000,
        texts: [
          {
            text: 'MAKING THE WEB',
            font: '82px Lato',
            x: centerX,
            y: () => {return centerY() - 250;}
          },
          {
            text: 'MORE',
            font: '82px Lato',
            x: centerX,
            y: () => {return centerY() - 150;}
          },
          {
            text: 'NOBLESS',
            font: '82px Lato',
            x: centerX,
            y: () => {return centerY() - 50;}
          },
          {
            text: 'FABULOUS',
            font: '82px Lato',
            x: centerX,
            y: () => {return centerY() + 50;}
          },
          {
            text: 'TURBULENCE',
            font: '82px Lato',
            x: centerX,
            y: () => {return centerY() + 150;}
          },
          {
            text: 'GORGEOUS',
            font: '82px Lato',
            x: centerX,
            y: () => {return centerY() + 250;}
          }
        ]
      },
      {
        time: 2000
      }
    ];

    dotsText.doSenario(scenario, true);
  }
}

class DotsText {
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

  dots: Dot[];
  numberPixelCoordinates: Object[];
  circleRadius: number;

  option: any;

  constructor(dotsElement: any, canvasElement: any, option: any) {
    let timerResize;

    this.dotsStage = dotsElement;
    this.dotsStageCtx = dotsElement.getContext('2d');

    this.textStage = canvasElement;
    this.textStageCtx = canvasElement.getContext('2d');

    this.dots = [];
    this.numberPixelCoordinates = [];
    this.circleRadius = 2;

    this.option = option;
    this.dotsStage.style.backgroundColor = this.option.background;

    window.addEventListener('resize', () => {
      clearTimeout(timerResize);
      timerResize = setTimeout(this.init.bind(this), 100);
    });

    this.init();
    this.loop();
  }

  init() {
    this.initSize();
    this.initDraw();
  }

  initSize() {
    let boundingClientRect = this.option.getClientRect();

    this.dotsStageWidth = this.dotsStage.width = boundingClientRect.width;
    this.dotsStageHeight = this.dotsStage.height = boundingClientRect.height;
    this.dotsStageCenterX = this.dotsStageWidth / 2;
    this.dotsStageCenterY = this.dotsStageHeight / 2;

    this.textStageWidth = this.textStage.width = this.dotsStageWidth;
    this.textStageHeight = this.textStage.height = this.dotsStageHeight;
    this.textStageOffsetX = (this.dotsStageWidth - this.textStageWidth) / 2;
    this.textStageOffsetY = (this.dotsStageHeight - this.textStageHeight) / 2;
  }

  initDraw() {
    this.dots.length = 0;

    for (let i = 0; i < this.option.maxDotCount; i++) {
      let dot = new Dot(
        this.dotsStageCtx,
        {
          x: this.randomNumber(0, this.dotsStageWidth),
          y: this.randomNumber(0, this.dotsStageHeight),
          color: this.option.colors[this.randomNumber(0, this.option.colors.length)],
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

  drawText(texts) {
    this.textStageCtx.clearRect(0, 0, this.textStageWidth, this.textStageHeight);
    this.textStageCtx.fillStyle = '#24282f';
    this.textStageCtx.textAlign = 'center';

    for (let i = 0; i < texts.length; i++) {
      if (texts[i].text) {
        this.textStageCtx.font = texts[i].font;
        this.textStageCtx.fillText(texts[i].text, texts[i].x(), texts[i].y());
      }
    }    

    this._draw();
  }

  drawImage(image) {
    let that = this;
    let imageObject = new Image();
    let hasScaleChanged;

    this.textStageCtx.clearRect(0, 0, this.textStageWidth, this.textStageHeight);
    this.textStageCtx.fillStyle = '#24282f';

    imageObject.onload = () => {
      if (image.scale) {
        hasScaleChanged = true;
        this.textStageCtx.save();  
        this.textStageCtx.scale(image.scale.x, image.scale.y);
      }
      this.textStageCtx.drawImage(imageObject,
        (image.x() - imageObject.width) * 0.5,
        (image.y() - imageObject.height) * 0.5
      );
      
      hasScaleChanged && this.textStageCtx.restore();

      that._draw();
    };

    imageObject.src = image.src;
  }

  _draw() {
    let imageData = this.textStageCtx.getImageData(0, 0, this.textStageWidth, this.textStageHeight).data;
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
          }
        }
      }

      for (let i = 0; i < this.numberPixelCoordinates.length; i++) {
        this.dots[i] && this.animateDot(this.dots[i], this.numberPixelCoordinates[i]);
      }
  }

  breakText() {
    for (let i = 0; i < this.numberPixelCoordinates.length; i++) {
      this.dots[i] && this.animateDot(this.dots[i], '', 'space');
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

  doSenario(scenario, isRepeat) {
    this._doPart(scenario, 0, isRepeat);
  }

  _doPart(scenario, index, isRepeat) {
    let that = this;

    if (index < scenario.length) {
      if (scenario[index].image) {
        that.drawImage(scenario[index].image);
      } else if (scenario[index].texts) {
        that.drawText(scenario[index].texts);
      } else {
        that.breakText();
      }
      
      setTimeout(() => {
        that._doPart(scenario, index + 1, isRepeat);
      }, scenario[index].time);  
    } else if (isRepeat) {
      that.doSenario(scenario, isRepeat);
    }
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
