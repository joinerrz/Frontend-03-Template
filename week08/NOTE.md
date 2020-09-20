# 前端进阶 week07 总结

这周主要是实现了一个具有基础 AI 功能的 TicTacToe 游戏。

并且，复习了一步的几种方法：

- callback
- promise
- async/await
- generator

扩展：

手写实现 async/await。(generator 应用)

```js
function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(arg) {
        let generatorResult;
        try {
          generatorResult = gen.next(arg);
        } catch (error) {
          return reject(error);
        }

        const { done, value } = generatorResult;

        if (done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(
            (val) => step(val),
            (err) => reject(error)
          );
        }
      }

      step();
    });
  };
}

const getData = (n) =>
  new Promise((resolve) => setTimeout(() => resolve(`data  ${n}`), 1000));

function* testG() {
  const data = yield getData(1);
  console.log('data: ', data);
  const data2 = yield getData(2);
  console.log('data2: ', data2);
  return 'success';
}

const tt = asyncToGenerator(testG);

tt().then((res) => {
  console.log('all is success');
  console.log(res);
});
```
