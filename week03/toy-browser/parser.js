const css = require('css');
const { match } = require('assert');

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let stack = [{ type: 'document', children: [] }];

let rules = [];

// 计算优先级
function specificity(selector) {
  var p = [0, 0, 0, 0];

  const selectorParts = selector.split(' ');

  for (let part of selectorParts) {
    const matchresult = part.match(
      /([a-zA-Z]+)?(#[a-zA-Z]+)?([\.a-zA-Z0-9]+)*/
    );

    // id 选择器
    if (matchresult[2]) {
      p[1] += 1;
    }

    // 标签选择器
    if (matchresult[1]) {
      p[3] += 1;
    }

    // class 选择器
    if (matchresult[3]) {
      p[2] += matchresult[3].split('.').length - 1;
    }
    // 伪类选择器 和 属性选择器
    if (part.includes(':') || part.includes('type')) {
      p[2] += 1;
    }
  }

  return p;
}

// 比较优先级
function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0];
  }

  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1];
  }

  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2];
  }

  return sp1[3] - sp2[3];
}

// 收集 css 规则
function addCSSRules(text) {
  var ast = css.parse(text);
  rules.push(...ast.stylesheet.rules);
}

function computeCSS(element) {
  if (!rules.length) return;

  // 获取当前元素的所有父元素
  let elements = stack.slice().reverse();

  if (!element.computedStyle) {
    element.computedStyle = {};
  }

  for (let rule of rules) {
    // 分割选择器  reverse 从内向外匹配
    let selectorParts = rule.selectors[0].split(' ').reverse();

    // 判断当前函数
    if (!matchElement(element, selectorParts[0])) {
      continue;
    }

    let matched = false;

    var j = 1;

    // 匹配父元素
    for (let i = 0; i < elements.length; i++) {
      if (matchElement(elements[i], selectorParts[j])) {
        j++;
      }
    }

    // 判断当前元素匹配到了
    if (j >= selectorParts.length) {
      matched = true;
    }

    if (matched) {
      const sp = specificity(rule.selectors[0]);

      // 如果匹配到了
      const computedStyle = element.computedStyle;

      for (let declaration of rule.declarations) {
        const property = declaration.property;
        if (!computedStyle[property]) {
          computedStyle[property] = {};
        }

        if (!computedStyle[property].specificity) {
          computedStyle[property].value = declaration.value;
          computedStyle[property].specificity = sp;
        } else if (compare(computedStyle[property].specificity, sp) < 0) {
          computedStyle[property].value = declaration.value;
          computedStyle[property].specificity = sp;
        }
      }
    }
  }
}

function matchElement(element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }

  if (selector.charAt(0) === '#') {
    let attr = element.attributes.filter((attr) => attr.name === 'id')[0];

    if (attr && attr.value === selector.replace('#', '')) {
      return true;
    }
  } else if (selector.charAt(0) === '.') {
    let attr = element.attributes.filter((attr) => attr.name === 'class')[0];

    return (
      attr &&
      attr.value &&
      attr.value.split(' ').some((cls) => selector.split('.').includes(cls))
    );
  } else {
    if (element.tagName === selector) {
      return true;
    }
  }

  return false;
}

function emit(token) {
  let top = stack[stack.length - 1];

  // 入栈
  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: [],
    };

    element.tagName = token.tagName;

    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p],
        });
      }
    }

    computeCSS(element);

    element.parent = top;
    top.children.push(element);

    if (!token.isSleftClosing) {
      stack.push(element);
    }

    currentTextNode = null;
  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error('Tag start end doesnt match!');
    } else {
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content);
      }
      stack.pop();
    }

    currentTextNode = null;
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: '',
      };
      top.children.push(currentTextNode);
    }

    currentTextNode.content += token.content;
  }
}

const EOF = Symbol('EOF'); // EOF: end of file

function data(c) {
  // 先判断是不是tag
  if (c === '<') {
    // 标签开始
    return tagOpen;
  } else if (c === EOF) {
    emit({
      type: 'EOF',
    });
    return;
  } else {
    // 不是小于的话就认为是文本节点
    emit({
      type: 'text',
      content: c,
    });
    return data;
  }
}

// 判断是哪种标签
function tagOpen(c) {
  // 先判断是不是结束标签

  if (c === '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: '',
    };
    return tagName(c);
  } else {
    return;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: '',
    };
    return tagName(c);
  } else if (c == '>') {
    // < 紧跟着一个 > 则报错
  } else if (c === EOF) {
    //报错
  } else {
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    // <html l
    // 遇到空格 则进入属性之前
    return beforeAttributeName;
  } else if (c === '/') {
    // 自封闭标签
    return selfCloseingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c; // toLowserCase()
    // 英文字符串
    return tagName;
  } else if (c === '>') {
    emit(currentToken);
    // 标签解析完
    return data;
  } else {
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '/' || c === '>' || c === EOF) {
    // 提交 带属性的 开始标签
    // 结束
    return afterAttributeName(c);
  } else if (c === '=') {
    // 不可能在属性开头是 =,  抛错
  } else {
    currentAttribute = {
      name: '',
      value: '',
    };

    return attributeName(c);
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c);
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '\u0000') {
  } else if (c === '"' || c === "'" || c === '<') {
  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return beforeAttributeValue;
  } else if (c === '"') {
    // 双引号
    return dobuleQuotedAttributeValue;
  } else if (c === "'") {
    // 单引号
    return singleQuotedAttributeValue;
  } else if (c === '>') {
  } else {
    return UnquotedAttributeValue(c);
  }
}

function dobuleQuotedAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return dobuleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '/') {
    return selfCloseingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return dobuleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if (c === "'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}

//无引号
function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfCloseingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === '\u0000') {
  } else if (c === '"' || c == "'" || c === '<' || (c === '=') | (c === '`')) {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if (c === '/') {
    return selfCloseingStartTag;
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;

    currentAttribute = {
      name: '',
      value: '',
    };

    return attributeName(c);
  }
}

function selfCloseingStartTag(c) {
  // 自封闭只有 > 是有效的，其他的都报错
  if (c === '>') {
    currentToken.isSleftClosing = true;
    // 提交自封闭标签
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
  }
}

module.exports.parseHTML = function parseHTML(html) {

  // data 是初始状态
  let state = data;

  // 对html中每个字符进行循环，调用状态机
  for (let c of html) {
    state = state(c);
  }

  // 防止文本没有截止标志
  state = state(EOF);

  return stack[0];
};
