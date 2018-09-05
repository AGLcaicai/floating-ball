# ngx-float-ball

这是一个Angular的悬浮球控件。

- 支持触摸滑动
- 支持鼠标拖动
- 支持图标

## 效果展示

![](http://fly-share-image.oss-cn-beijing.aliyuncs.com/18-9-4/97750938.jpg)

## 参数说明

Parameter | Type | Default Value | Description
:---:|:---:|:---:|:---:
clicked | signal | N/A | 鼠标点击事件
outerCircleDiameter | number | 60 | 外圆的直径
innerCircleDiameter | number | 30 | 内圆的直径
delayTime | 400 | number | 鼠标移动延迟响应时间
isBlinked | boolean | true | 是否闪烁悬浮球
hasRipple | boolean | true | 是否有点击波纹效果
foreground | string | #ffffff | 前景色,默认为白色
background | string | #F44336 | 前景色,默认为红色
icon | string | null | 图标路径
iconDiameter | number | 30 | 图标的直径


## 安装

```
npm install ngx-float-ball --save
```

## 使用

1. 在app.module.ts内导入：

```
import { NgxFloatBallModule } from 'ngx-float-ball'
```

2. 在html内使用

```
<ngx-float-ball [isBlinked]="true"
    [hasRipple]="false"
    [icon]="'../assets/face.svg'">
</ngx-float-ball>
```

![](http://fly-share-image.oss-cn-beijing.aliyuncs.com/18-9-5/53800170.jpg)

## TODO

- [x] 增加背景色和前景色属性
- [x] 增加图标支持
- [x] 优化渲染
- [ ] 触摸延迟生效
- [x] 触摸到窗口外边界, 造成悬浮球不见防呆
- [ ] 鼠标点击后动画消失，背景色更改至设定背景色
- [ ] 增加自定义嵌入元素
- [ ] 增加弹力吸附

## License

- MIT