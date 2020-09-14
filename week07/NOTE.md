# 前端进阶 week07 总结

## HTML

### HTML 发展

- SGML: Standard Generalized Markup Language(标准通用标记语言)
- XML: Extensible Markup Language(可扩展标记语言)
- HTML: HyperText Markup Language(超文本标记语言)

### HTML 语法

- 标签:
  - 普通标签写法: `<tagname>...</tagname>`
  - 自封闭标签: `<tag/>`
  - 带有属性的标签: `<tagname attr="value"></tagname>`
- 文本:
  - text
  - CDATA: `<![CDATA[ ]]>`
- 注释: `<!-- comments -->`
- DTD: `<!DOCTYPE html>`
- 处理信息 Processing Instruction（了解）: `<?a 1?>`

### HTML 标签语义

- 语义类标签增强了可读性，对开发者友好，即使没有 CSS 的时候，开发者也能够清晰地看出网页的结构，也更便于团队的开发和维护。
- 语义类标签也十分适宜机器阅读。
- 搜索引擎检索（SEO），让爬虫更好地获取到更多有效信息，提升网页的搜索量

## 浏览器 API

- DOM
- CSSOM

### BOM

### DOM

- 节点 Node： DOM 树型结构中的节点相关的 API
- 事件 Event:触发和监听事件相关的 API
- Range: 操作文字范围相关的 API
- traversal

#### 节点相关

DOM (Document Object Model，文档对象模型)，是 HTML 文档节点的 javascript 运行时模型。

DOM 树中节点类型的继承关系：

##### 节点/元素 的导航操作

- 导航`节点`的前、后、父、子节点

  - parentNode 父节点
  - childNodes 所有的 子节点
  - firstChild 第一个子节点
  - lastChild 最后一个子节点
  - nextSibing 相邻的后一个节点
  - previousSibing 相邻的前一个节点

导航`元素`的前、后、父、子元素。（只会主语 element 元素节点）

- parentElement 父元素节点 等同于 parentNode
- children 所有的子元素节点
- firstElementChild 第一个子元素节点
- lastElementChild 最后一个子元素节点
- nextElementSibing 相邻的后一个元素节点
- previousElementSibing 相邻的前一个元素节点

##### 操作 DOM 树中的节点

- appendChild
- insertChild
- removeChild
- replaceChild

##### 创建节点

- createElement 创建元素节点
- createTextNode 创建文本节点
- createComment 创建主食节点
- createDocumentFragment
- createDocuemtnType

##### 节点的属性 Attribute

- getAttribute
- setAttribute
- removeAttribute
- hasAttribute

#### Other Convenient API

- compareDocumentPosition
- contains
- isEqualNode
- isSameNode 等同于 '==='
- cloneNode

#### 事件

事件捕获和冒泡

所有的事件都经过捕获和冒泡两个过程，先捕获，后冒泡。其中捕获是浏览器的操作，当鼠标点击某个元素时，浏览器会获取到鼠标点击的坐标，根据坐标，通过从外向内的捕获过程确定到被点击元素。而冒泡则是从内向外触发绑定事件。

语法：

```js
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);
target.addEventListener(type, listener, useCapture, wantsUntrusted); // Gecko/Mozilla only
```

### CSSOM

CSS 对象模型（即 CSSOM）。

CSSOM 是一组允许 JavaScript 操作 CSS 的 API。它非常类似于 DOM，但是用于 CSS 而不是 HTML。它允许用户动态读取和修改 CSS 样式。

`Document.styleSheets` 只读属性，返回一个由 StyleSheet 对象组成的 StyleSheetList（类数组），每个 StyleSheet 对象都是一个文档中链接或嵌入的样式表。

CSS Rules 操作：

- 查看：document.styleSheets[0].cssRules[*]
- 增加：document.styleSheets[0].insertRule("p { color:red; }", 0)
- 移除：document.styleSheets[0].removeRule(0)
- 修改 property 和 value：document.styleSheets[0].cssRules[0].style.color = 'red'
- 修改选择器：document.styleSheets[0].cssRules[0].selectorText = '\*'

#### CSSOM View

浏览器渲染的视图相关。

##### window

- window.innerHeight, window.innerWidth：viewport 可视范围的尺寸
- window.outerWidth, window.outerHeight：整个浏览器窗体尺寸
- window.devicePixelRatio：CSS 像素和屏幕物理像素比率
- window.screen：屏幕信息
  - window.screen.width
  - window.screen.height
  - window.screen.availWidth
  - window.screen.availHeight
  - ...

##### Window API

var opened = window.open("about:blank", "\_blank" ,"width=100,height=100,left=100,right=100" )
对于自己打开的页面：

- moveTo(x, y)
- moveBy(x, y)
- resizeTo(x, y)
- resizeBy(x, y)

##### scroll

- scrollTop
- scrollLeft
- scrollWidth
- scrollHeight
- scroll(x, y) or scrollTo(x, y)
- scrollBy(x, y)
- scrollIntoView()
- window
  - scrollY
  - scroll(x, y)
  - scrollBy(x, y)

##### layout

- getClientRects()
- getBoundingClientRect()
