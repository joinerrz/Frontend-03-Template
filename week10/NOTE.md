# 前端进阶 week10 总结

本周主要是使用 LL 算法构建 AST。

## LL 算法

构建 AST（抽象语法树）的过程，叫做语法分析。

核心思想有两种

- LL 算法（left left）： 从左到右扫描，从左到右归并
- LR 算法

## 四则运算

### 词法分析

- TokenNumber:
  - 1 2 3 4 5 6 7 8 9 0
- Operator: + - \* / 之一
- Whitespace: <SP>
- LineTerminator: <LF> <CR>

### 语法分析

四则运算的产生式。

```js
// 产生式
<Expression>::=
  <AdditiveExpression><EOF>

// 加法表达式
<AdditiveExpression>::=
  <MultiplicativeExpression>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>

// 乘法表达式
<MultiplicativeExpression>::=
  <Number>
  |<MultiplicativeExpression><\*><Number>
  |<MultiplicativeExpression></><Number>

```

### 实现

### 1. 使用正则进行词法分析

使用正则进行词法分析， 获取到正确的 token

### 2. 根据产生式进行，语法分析

根据上边的产生式，根据每一条语法，遍历 token，从而获取到一个完整的树形结构。

具体实现，请参照 index.js 中代码。
