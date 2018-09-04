import { Component, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-float-ball',
  template: `
  <div id="floating-ball-container"
       class="{{rippleClassName}} {{blinkingAnimationClassName}}"
       (click)="clicked.emit();"
       [style.cursor]="currentCursorStyle"
       [style.width]="addUnit(outerCircleDiameter)"
       [style.height]="addUnit(outerCircleDiameter)">
      <div id="inner-circle"
        [style.width]="addUnit(innerCircleDiameter)"
        [style.height]="addUnit(innerCircleDiameter)"
        [style.top]="addUnit(outerCircleDiameter / 2 - innerCircleDiameter / 2)"
        [style.left]="addUnit(outerCircleDiameter / 2 - innerCircleDiameter / 2)">
      </div>
</div>
  `,
  styleUrls: ['./ngx-float-ball.scss', './ripple.scss']
})
export class NgxFloatBallComponent implements AfterViewInit {

  // 点击悬浮球信号
  @Output() public clicked = new EventEmitter();
  @Input() outerCircleDiameter = 60;    // 外圆直径
  @Input() innerCircleDiameter = 30;    // 内圆直径
  @Input() delayTime = 400;             // 鼠标移动延迟时间，即按压400ms后生效
  @Input() isBlinked = true;            // 是否闪烁
  @Input() hasRipple = true;            // 是否有点击波纹效果

  posX = 0;            // 悬浮球的x轴位置
  posY = 0;            // 悬浮球的y轴位置

  isPressed = false;   // 鼠标是否按下的标记
  lastMousePos = {     // 记录鼠标按下时的坐标
    x: 0,
    y: 0
  };
  mouseOffsetX = 0;    // 鼠标X偏移量
  mouseOffsetY = 0;    // 鼠标X偏移量
  elementOffsetX = 0;  // 悬浮球容器的X偏移量
  elementOffsetY = 0;  // 悬浮球容器的Y偏移量

  currentCursorStyle = 'default';
  rippleClassName = 'ripple';
  blinkingAnimationClassName = 'blinking';
  private timer: any;
  private cursorStyle = { default: 'default', moved: 'move' };

  constructor() {
    if (!this.hasRipple) {
      this.rippleClassName = '';
    }

    if (!this.isBlinked) {
      this.blinkingAnimationClassName = '';
    }

   }

  ngAfterViewInit() {


    const rootNode = document.getElementById('floating-ball-container');
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;

    // >>>-------------------------------------------------------------------------------------------
    // 鼠标移动
    rootNode.addEventListener('mousedown', (event) => {
      this.timer = setInterval(() => {
        this.isPressed = true; // 确认鼠标按下
        this.openMovedCursor();
      }, this.delayTime);
      this.lastMousePos.x = event.clientX; // 记录鼠标当前的x坐标
      this.lastMousePos.y = event.clientY; // 记录鼠标当前的y坐标
      this.elementOffsetX = rootNode.offsetLeft; // 记录容器元素当时的左偏移量
      this.elementOffsetY = rootNode.offsetTop; // 记录容器元素的上偏移量
      event.preventDefault();                   // 取消其他事件
    }, false);

    // 此处必须挂载在document上，否则会发生鼠标移动过快停止
    document.addEventListener('mousemove', (event) => {
      if (this.isPressed) {// 如果是鼠标按下则继续执行
        this.mouseOffsetX = event.clientX - this.lastMousePos.x; // 记录在鼠标x轴移动的数据
        this.mouseOffsetY = event.clientY - this.lastMousePos.y; // 记录在鼠标y轴移动的数据
        this.posX = this.elementOffsetX + this.mouseOffsetX; // 容器在x轴的偏移量加上鼠标在x轴移动的距离
        this.posY = this.elementOffsetY + this.mouseOffsetY; // 容器在y轴的偏移量加上鼠标在y轴移动的距离

        // 右边界
        if (this.posX + this.outerCircleDiameter > viewWidth) {
          this.posX = viewWidth - this.outerCircleDiameter;
        }

        // 左边界
        if (this.posX < 0) {
          this.posX = 0;
        }

        // 下边界
        if (this.posY + this.outerCircleDiameter > viewHeight) {
          this.posY = viewHeight - this.outerCircleDiameter;
        }

        // 上边界
        if (this.posY < 0) {
          this.posY = 0;
        }
        rootNode.style.left = this.posX + 'px';
        rootNode.style.top = this.posY + 'px';
      }
    }, false);

    // 鼠标释放时候的函数
    document.addEventListener('mouseup', () => {
      this.isPressed = false;
      this.closeMovedCursor();
      clearInterval(this.timer);  // 释放定时器
    }, false);
    // <<<-------------------------------------------------------------------------------------------

    // >>>-------------------------------------------------------------------------------------------
    // 触摸移动
    rootNode.addEventListener('touchmove', (event) => {
      event.preventDefault(); // 阻止其他事件
      if (event.targetTouches.length === 1) {
        const touch = event.targetTouches[0]; // 把元素放在手指所在的位置
        this.posX = touch.pageX; // 存储x坐标
        this.posY = touch.pageY; // 存储Y坐标
        if ((touch.pageX + this.outerCircleDiameter) > viewWidth) {// 超越右边界
          this.posX = viewWidth - this.outerCircleDiameter / 2;
        }
        if ((touch.pageY + this.outerCircleDiameter) > viewHeight) {// 超越下边界
          this.posY = viewHeight - this.outerCircleDiameter;
        }
        if ((touch.pageX - this.outerCircleDiameter) < 0) {// 超越左边界
          this.posX = this.outerCircleDiameter / 2;
        }
        if ((touch.pageY - this.outerCircleDiameter) < 0) {// 超越上边界
          this.posY = this.outerCircleDiameter / 2;
        }
        rootNode.style.left = this.posX + 'px';
        rootNode.style.top = this.posY + 'px';
      }
    });
    // <<<-------------------------------------------------------------------------------------------
  }

  /**
  * @method changeCursorStyle 动态修改鼠标指针的样式
  * @return void
  * @author vincent 2018-09-02
  * @version 0.0.1
  * @example
  * @log 1. vincent,2018-09-02,完成
  */
  openMovedCursor(): void {
    if (this.currentCursorStyle === this.cursorStyle.moved) {
      return;
    }

    this.currentCursorStyle = this.cursorStyle.moved;
  }

  closeMovedCursor(): void {

    if (this.currentCursorStyle === this.cursorStyle.default) {
      return;
    }
    this.currentCursorStyle = this.cursorStyle.default;
  }

  addUnit(value: number): string {
    return value + 'px';
  }

}
