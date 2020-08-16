# 前端进阶 week03 总结

## toy-browser 整体流程

url -- http --> html -- parse --> DOM -- css computing --> DOM with css -- layout --> DOM with posting -- render --> Bitmap

### 解析 HTML

- 用 FSM 优先状态机来实现 HTML 的分析
- 在 HTML 标准中，已经规定了 HTML 的状态，省去了自己去设计这个状态的工作，参考 [html 标准](https://html.spec.whatwg.org/multipage/)
- toy-browser 只挑选其中一部分的状态，完成一个最简版本。

**标签分类**：

- 开始标签
- 结束标签
- 自封闭标签

将解析到的数据，存在 token 中：

- 在状态机中，除了状态迁移，还需要加入业务逻辑 创建 token、提交 token
- 在标签结束状态提交标签 token

html 解析 ，解析在编译原理上边叫做词法分析。接下来的构建 dom 树则为语法分析。

### 用栈实现 dom 树构建

通过一个栈来检测标签的合并，从而实现 dom 树的构建。

通过栈来检测标签的合并，这个简单的算法参考 [leecode 第 20 题 有效括号](https://leetcode-cn.com/problems/valid-parentheses/) 。

实现：

```js
const isValid = (s) => {
  const stack = [];
  const parenMap = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  for (let i = 0; i < s.length; i++) {
    const item = a[i];
    if (!parenMap[item]) {
      stack.push(item);
    } else if (!stack.length || parenMap[item] !== stack.pop()) {
      return false;
    }
  }

  return !stack.length;
};
```

和上边简单的检测有效括号相同，通过 token 的 type 和 tagName 可以匹配到相同的标签。代码见 `toy-browser`。

### 解析 css， 收集 css

这里只解析`style`标签中的 css，其他复杂的暂不考虑。直接引用`css`包来解析。
将解析出来的 css 规则放在 `rules` 中。

### computeCSS

- 当创建一个元素后，立即计算 css
- 理论上， 当我们分析一个元素是，所有 css 规则已经手机完毕（所有 head 里的元素已经收集完， head 里的元素没有办法计算 css,同理 html 标签的 css 也忽略）
- 真实浏览器中，可能遇到写在 body 的 style 标签，需要重新 CSS 计算的情况，这里也忽略。

compute CSS 必须知道元素的所有父元素才能判断元素与规则是否匹配，所以计算时，首先将当前`stack`中元素（为当前元素的所有父元素）取出。并且由于 css 的匹配规则是从内向外的所以要反转一下，使离当前元素最近的父元素在数组中第一个。

```js
let elements = stack.slice().reverse();
```

### 匹配 css selector

遍历 rules 检测每一条 rule 是否匹配当前元素（包括 匹配当前元素和匹配父元素）。

### 生成 computed 属性

当 rule 匹配到当前元素，则根据 rule 来生成对应的`couputed 属性`。

当有`多条rule`匹配到当前元素是，对相同的属性，就要根据 rule 的优先级来决定，值的结果。

### 优先级的判断

优先级的标记： 是用四位的数组来标记，第一位表示是否是行内属性，第二位表示id选择器，第三位表示class选择器，第四位表示标签选择器。

例如：

```
body div #test img.image {

}
// 可以用  [0, 1, 1, 3] 来表示
// 表示： 不是行内属性，有1个id选择器，有1个class选择器，有3个标签选择器
```

> 伪类选择器（如：hover）和属性选择器（如[type="input"]）与一个类选择器的优先级相同。通用选择器（＊）和组合器（&gt;、+、～）对优先级没有影响。

通过计算css的优先级，进行css叠加，最终生成 dom 元素的 computed 属性。

## 总结

经过上述一系列的动作，最终生成了一个带有css属性的dom树。
