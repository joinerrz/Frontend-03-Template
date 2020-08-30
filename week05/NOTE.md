# 前端进阶 week05 总结 - 重学 css

## css 构成

### at-rule

- @charset
- @import
- @media
- @fontface
- @page
- @supports
- @namespace
- @counter-style
- ...

### rule

rule 的结构：

- 选择器 Selector [COMMA S+ selector]
- 声明
  - key
    - Properties
    - Variables
  - value

## 选择器

### 选择器类型

- 简单选择器
  - -
  - 类型选择器 div
  - class 选择器
  - id 选择器
  - 属性选择器 [attr=value]
  - 伪类选择器 :hover
  - 伪元素选择器 ::before
- 复合选择器
  - <简单选择器> <简单选择器> <简单选择器>
  - - 或者 div 必须写在最前端，伪类、伪元素必须在最后边
- 复杂选择器
  - <复合选择器> <sp> <复合选择器>
  - <复合选择器> ">" <复合选择器>
  - <复合选择器> "~" <复合选择器>
  - <复合选择器> "+" <复合选择器>
  - <复合选择器> "||" <复合选择器>

### 伪类

- 链接/行为
  - :any-link
  - :link、:visited
  - :hover
  - :active
  - :focus
  - :target
- 树结构
  - :empty
  - :nth-child()
  - :nth-last-child()
  - :first-child、:last-child 、:only-child
- 逻辑型
  - :not 伪类
  - :where :has

### 伪元素

- ::before
- ::after
- ::first-line 选中第一行 针对渲染之后的第一行
- ::first-letter 把第一字母括起来

first-line 只支持 :

- font 系列
- color 系列
- background 系列
- word-spacing
- letter-spacing
- text-decoration
- text-transform
- line-height

first-letter

- font 系列
- color 系列
- background 系列
- word-spacing
- letter-spacing
- text-decoration
- text-transform
- line-height
- float
- vertical-align
- 盒模型系列： margin,padding,border

## 优先级

如果无法用来源解决冲突声明，浏览器会尝试检查它们的`优先级`。

浏览器将优先级分为两部分：HTML 的行内样式和选择器样式。

### 1. 行内样式

行内样式会覆盖任何来自样式表或者`<style>`标签的样式（import 例外）。行内样式没有选择器，因为它们值作用域所在元素。

### 2. 选择器优先级

不同类型的选择器有不同的优先级：

ID 选择器 > 类选择器 > 标签选择器

实际上，`ID选择器`的优先级比`拥有任意多个类的选择器`都高。

优先级的准确规则如下。

- 如果选择器的 ID 数量更多，则它会胜出（即它更明确）
- 如果 ID 数量一致，那么拥有最多类的选择器胜出。
- 如果以上两次比较都一致，那么拥有最多标签名的选择器生出。

> 伪类选择器（如： hover）和属性选择器（如[type=“input”]）与一个类选择器的优先级相同。通用选择器（\*）和组合器（>、+、~）对优先级没有影响。

这个概念很简单，但是如果不理解优先级，那就弄不清楚为什么一个规则能生效，另一个却不能。

### 3. 优先级标记

一个常用的表示优先级的方式是用数值形式来标记，通常用逗号隔开每个数。如： `1,2,2`表示选择器由 1 个 ID、2 个类、2 个标签组成。优先级最高的 ID 排在第一个，紧接着是类，然后是标签。

![优先级标记](http://cdn.renzhaosy.cn/daily/29069885-F574-44AA-A8E8-75D544DEBFF6.png)

现在通过比较数值就能决定哪个选择器优先级更高（更明确）。“1,0,0”的优先级高于“0,2,2”甚至“0,10,0”（尽管我不推荐写一个长达 10 个类名的选择器），因为第一个数（ID）有最高优先级。

还可以用 4 个数字来标记，第一位用 0 或 1 来表示，是否是用行内样式添加，`1,0,0,0`。

### 4. 源码的顺序

层叠的最后一步，是源码顺序。如果两个生命得了哀怨和优先级相同，其中一个声明在样式表中出现较晚，或者位于页面较晚引入的样式表中，则该声明生出。
也就是说，优先级相同时，后出现的样式会覆盖先出现的样式。

### 5. 两条经验法则

- 在选择器中不要使用 ID。就算使用一个 ID,也会大幅提升优先级。很难覆盖这个样式。
- 不要使用 `!important`。它比 ID 更难覆盖，一旦用它，想要覆盖原先的声明，就必须再加上一个`!important`。

## 思考题

为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

因该是 first-letter 会将个第一个元素括起来， 而第一个元素比较准别，就可以脱离文档流，在渲染之前就可以确认到;而 first-line 是选择第一行，而第一行的所有元素并不确定，这个是在渲染之后确认的。
