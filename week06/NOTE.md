# 前端进阶 week06 总结
## 排版

### 盒模型

HTML 代码中可以书写开始`标签`，结束`标签` ，和自封闭`标签` 。

一对起止`标签` ，表示一个`元素` 。

DOM 树中存储的是*元素`*和其它类型的节点（Node）。

CSS 选择器选中的是`元素` 。

CSS 选择器选中的`元素` ，在排版时可能产生多个`盒` 。

排版和渲染的基本单位是`盒` 。

- W3C 盒子模型 box-sizing:content-box: width = content
- IE 盒子模型 box-sizing:border-box: width = content + padding + border

排版就是把每个盒和文字排到正确的位置。

排版可以分为三代：
第一代： 正常流
第二代： flex
第三代： grid

### 正常流

规则：

- 从左到右书写
- 同一行写的文字都对齐
- 一行写满之后，就换到下一行

步骤：

- 收集盒和文字进行
- 计算盒在行中的排布
- 计算行的排布

- IFC （inline-level-formatting-context ）行内级格式化上下文
- BFC （block-level-formatting-context ）块级格式化上下文

### 行级排布

默认是基线对齐。
行内盒基线会根据内容变化，所以建议使用`vertical-align`

五条线（了解）：

- line-top
- text-top
- baseline 基线
- text-bottom
- line-bottom

### BFC

BFC （block-level-formatting-context ）块级格式化上下文。

特性：

- 外边距合并： 同一个 BFC 内的元素，上下方向的 margin 会折叠
- BFC 的内外元素互相不影响
- BFC 不会与浮动元素发生重叠
- BFC 元素的高度计算会包括元素内的浮动元素的高度

触发（设立 BFC）的条件：

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position(absolute、fixed)
- display 为 inline-block、table-cell、flex(flex item 是 BFC)
- overflow 除了 visible 以外的值（hidden、auto、scroll）

## 动画

### Animation

- @keyframes 定义 动画
- animation 使用动画

animation 属性是 animation-name，animation-duration, animation-timing-function，animation-delay，animation-iteration-count，animation-direction，animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。

• animation-name 动画名称
• animation-duration 动画的时长；
• animation-timing-function 动画的时间曲线；来自于一个三次贝塞尔曲线
• animation-delay 动画开始前的延迟；
• animation-iteration-count 动画的播放次数；
• animation-direction 动画的方向。

### transition

transition 属性是一个简写属性，用于设置四个过渡属性：

• transition-property 过渡效果的 CSS 属性的名称；
• transition-duration 完成过渡效果需要多少秒或毫秒
• transition-timing-function 时间曲线；
• transition-delay 延迟。
