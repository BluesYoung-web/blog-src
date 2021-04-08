---
title: TweenJS使用教程
top_img: /img/ts.jpg
cover: /img/ts.jpg
categories: 使用教程
tags:
  - TS
  - JS
  - TweenJS
date: 2021-03-15 13:43:36
---

## 说明

- 一个简单的补间动画库
- 支持数字对象的属性和 `CSS` 样式属性赋值

- 可使用简单的 `API` 实现复杂的动画，可链式调用

## 使用步骤

```js
import { Tween, Easing, update } from '@tweenjs/tween.js';
// 初始位置
const position = { x: 0, y: 0 };
const tween = new Tween(position);
// 1s 之后变换到的最终位置
tween.to({ x: 100, y: 100 }, 1000);
// 开始动画
tween.start();
// 更新时的回调函数
tween.onUpdate(() => ());
// 指定变化曲线(弹球)
tween.easing(Easing.Bounce.Out)
// 指定重复次数 n ∈ [0, Infinity]
tween.repeat(n);
// 只是在使用 repeat 方法时起作用，类似于悠悠球的效果，在动画开始或结束处向反方向反弹
tween.yoyo(true);
// 设置动画之间的延时
tween.delay(1000);
const animation = () => {
  requestAnimationFrame(animation);
  // 指定更新时间
  update();
}
requestAnimationFrame(animation);

// 指定动画链
tweenA.chain(tweenB);
// 开始动画前的回调函数
tween.onStart();
// 结束动画后的回调函数
tween.onStop();
// 动画全部结束时执行
tween.onComplete();

```

