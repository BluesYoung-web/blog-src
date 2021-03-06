---
title: 67-计时API
top_img: /img/hbs.png
cover: /img/hbs.png
categories:
  - 学习笔记
  - 红宝书
  - 第20章——JavaScriptAPI
tags:
  - 红宝书第四版
  - JavaScript
date: 2021-02-02 09:05:49
---

## 代码运行计时

- `Date.now()` 只有毫秒级精度，如果代码执行速度足够快，时间戳将相等
- `window.performance.now()` 返回一个**微秒级**的浮点值，这个方法可以保证时间戳单调增

### `performance.now()`

- 在执行上下文**创建时**从 0 开始计时
- 这个计时器在**不同上下文中**初始化时可能存在时间戳
- `performance.timeOrigin` 返回计时器初始化时全局时钟的值

> 通过使用 `performance.now()` 测量 `L1` 缓存与主内存的延迟差，幽灵漏洞（`Spectre`） 可以执行缓存推断攻击。为弥补这个安全漏洞，所有的主流浏览器有的选择降低 `performance.now()` 的精度，有的选择在时间戳里混入一些随机性

### `performance.getEntries()`

- 返回代表浏览器的性能时间线的集合
- 每个对象都有 `name\entryType\startTime\duration` 属性

### `performance.mark(tag)`

- 用于记录和分析自定义性能条目
- 压入顺序 `unshift`

```js
performance.mark('foo');
for (let i = 0; i < 1E6; ++i) {}
performance.mark('bar');
const [endMark, startMark] = performance.getEntriesByType('mark');
console.log(startMark.startTime - endMark.startTime); // 1.3299999991431832 
```

### `performance.measure(tag, s_tag, e_tag)`

- 分析两个标记之间的持续时间

```js
performance.mark('foo');
for (let i = 0; i < 1E6; ++i) {}
performance.mark('bar');
performance.measure('baz', 'foo', 'bar');
const [differenceMark] = performance.getEntriesByType('measure');
console.log(differenceMark);
// PerformanceMeasure {
// name: "baz",
// entryType: "measure",
// startTime: 298.9800000214018,
// duration: 1.349999976810068
// }
```

## 页面加载计时

- 浏览器会在导航事件发生时自动记录 `PerformanceNavigationTiming`
- 这个对象会捕获大量的时间戳，用于描述页面时何时以及如何加载的

```js
const [p_e] = performance.getEntriesByType('navigation');
console.log(p_e);
// PerformanceNavigationTiming {
// connectEnd: 2.259999979287386
// connectStart: 2.259999979287386
// decodedBodySize: 122314
// domComplete: 631.9899999652989
// domContentLoadedEventEnd: 300.92499998863786
// domContentLoadedEventStart: 298.8950000144541
// domInteractive: 298.88499999651685
// domainLookupEnd: 2.259999979287386
// domainLookupStart: 2.259999979287386
// duration: 632.819999998901
// encodedBodySize: 21107
// entryType: "navigation"
// fetchStart: 2.259999979287386
// initiatorType: "navigation"
// loadEventEnd: 632.819999998901
// loadEventStart: 632.0149999810383
// name: " https://foo.com "
// nextHopProtocol: "h2"
// redirectCount: 0
// redirectEnd: 0
// redirectStart: 0
// requestStart: 7.7099999762140214
// responseEnd: 130.50999998813495
// responseStart: 127.16999999247491
// secureConnectionStart: 0
// serverTiming: []
// startTime: 0
// transferSize: 21806
// type: "navigate"
// unloadEventEnd: 132.73999997181818
// unloadEventStart: 132.41999997990206
// workerStart: 0
// }
console.log(p_e.loadEventEnd – p_e.loadEventStart);
// 0.805000017862767 
```

## 资源请求计时

- 浏览器会在加载资源时自动记录 `PerformanceResourceTiming`
- 这个对象会捕获大量时间戳，用于描述资源加载的速度

```js
const p_e = performance.getEntriesByType('resource')[0];
console.log(p_e);
// PerformanceResourceTiming {
// connectEnd: 138.11499997973442 
// connectStart: 138.11499997973442
// decodedBodySize: 33808
// domainLookupEnd: 138.11499997973442
// domainLookupStart: 138.11499997973442
// duration: 0
// encodedBodySize: 33808
// entryType: "resource"
// fetchStart: 138.11499997973442
// initiatorType: "link"
// name: "https://static.foo.com/bar.png",
// nextHopProtocol: "h2"
// redirectEnd: 0
// redirectStart: 0
// requestStart: 138.11499997973442
// responseEnd: 138.11499997973442
// responseStart: 138.11499997973442
// secureConnectionStart: 0
// serverTiming: []
// startTime: 138.11499997973442
// transferSize: 0
// workerStart: 0
// }
console.log(p_e.responseEnd – p_e.requestStart);
// 493.9600000507198 
```

