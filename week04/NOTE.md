# 前端进阶 week04 总结

考虑到容易程度，这里只采用flex 排版。

- row
  - flex-direction: row
  - main: width x left right
  - Cross: height y top
  - bottom

- column
  - flex-direction: column
  - main: height y top
  - bottom
  - Cross: width x left right

确定layout 执行位置：

因为flex 布局是需要知道他的子元素的。所以
layout 发生在 结束标签之前， 调用 layout 函数。

## 排版
- 分行
  - 根据主轴尺寸，把元素分进行（hang）
  - 来一个元素就往当前行里放, 如果超出了，就将新元素放在新的一行中，以此类推，把每一个元素放到各个行中。
  - 如果设置了no-wrap, 则强制分配进第一行
- 计算主轴，找到flex属性的元素，把主轴方向剩余的尺寸按照比例分配给它们。如果剩余空间是负数，就等比压缩剩余元素
- 计算交叉轴。根据每一行中最大的元素尺寸计算行高，再根据flex-align 和 item-align ，确定元素的具体位置。
- 
  
## 渲染

- 准备图形环境 - images 包
- 在一个 viewport 上进行绘制
- 递归调用子元素的绘制方法，完成DOM 树的绘制
- 忽略一些不需要绘制的节点
- 实际浏览器中
  - 文字绘制需要依赖字体库
  - 对一些特殊节点，需要单独处理
  - 会对涂层做composition

## 总结

本周主要是对元素进行排版和渲染。主要实现了简易的flex 布局。










