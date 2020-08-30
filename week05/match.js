
function match(selector, element) {
  const selectors = formatSelector(selector);
  let count = selectors.length;
  let currentElement = element;

  function matchElement() {
    if (count <= 0) {
      console.log('匹配');
      return true;
    }

    const sel = selectors[count - 1];

    if (!sel.tagName && !sel.id && !sel.class) {
      return false;
    }

    // 不是当前元素
    if (
      sel.tagName &&
      sel.tagName !== currentElement.tagName.toLocaleLowerCase()
    ) {
      console.log('不是当前元素， 标签不匹配');
      return false;
    }

    if (sel.id && sel.id !== currentElement.id) {
      console.log('不是当前元素， id不匹配');
      return false;
    }

    if (sel.class && currentElement.classList) {
      const clsString = sel.class.join(' ');
      const curClasString = [...currentElement.classList].join(' ');
      if (clsString !== curClasString) {
        console.log('不是当前元素， class不匹配');
        return false;
      }
    }

    // 判断parent
    if (count > 0 && currentElement.parentNode) {
      count--;
      currentElement = currentElement.parentNode;
      matchElement();
    } else {
      console.log('不匹配');
    }
  }
  return matchElement();
}

function formatSelector(selector) {
  const selectorList = selector.split(' ');

  const result = selectorList.map((item) => {
    const r = {};
    const matchresult = item.match(
      /([a-zA-Z]+)?(#[a-zA-Z]+)?([\.a-zA-Z0-9]+)*/
    );
    // id 选择器
    if (matchresult[2]) {
      r.id = matchresult[2].replace('#', '');
    }

    // 标签选择器
    if (matchresult[1]) {
      r.tagName = matchresult[1];
    }

    // class 选择器
    if (matchresult[3]) {
      const _classList = matchresult[3].split('.').filter(Boolean);
      r.class = _classList;
    }
    return r;
  });

  return result || [];
}



match('div #root.cls', document.getElementById('root'));
