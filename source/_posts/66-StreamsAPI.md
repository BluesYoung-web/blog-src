---
title: 66-StreamsAPI
top_img: /img/hbs.png
cover: /img/hbs.png
categories:
  - 学习笔记
  - 红宝书
  - 第20章——JavaScriptAPI
tags:
  - 红宝书第四版
  - JavaScript
date: 2021-01-29 15:56:44
---

- 大块数据可能不会一次性都可用，使用流式处理可以让应用数据**一到达就能使用**
- 大块数据也可以分小部分处理，而不必等到所有数据都在内存中时再处理

## 流

- 为映射低级 `I/O` 原语而设计，包括适当时候对字节流的规范化
- 适用于处理网络请求和读写磁盘
- 可读流：
  - 可以通过某个公共接口**读取**数据块的流
  - 数据在内部从底层源进入流，然后由**消费者**(`consumer`)进行处理

- 可写流：
  - 可以通过某个公共接口**写入**数据块的流
  - **生产者**(`producer`)将数据写入流，数据在内部传入底层数据槽(`sink`)
- 转换流：
  - 由两种流组成，**可写流**用于接收数据，**可读流**用于输出数据
  - 这两个流之间是**转换程序**(`transformer`)，可根据需要检查和修改流内容

## 块

- `chunk`，流的基本单位
- 可以是任意数据类型，通常是定型数组
- 每个块都是离散的流片段，可作为一个整体来处理
- 大小不固定，时间间隔也不固定
- 理想情况下，大小相近，到达时间间隔相同
- 流出口 > 流入口，浪费一点内存，可以接受
- 流出口 = 流入口，理想状态
- 流出口 < 流入口，存在数据积压，需要作出处理(**反压**，暂停流入)

## 可读流

```js
async function* ints() {
  // 每一秒都生成一个递增的整数
  for(let i = 0; i < 5; i++) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}
// 创建可读流
const rd = new ReadableStream({
  async start(controller) {
    for await (const chunk of ints()) {
      controller.enqueue(chunk);
    }
    controller.close();
  }
});
// 未加锁
console.log(rd.locked); //false
// 获得读取器，加锁
const reader = rd.getReader();
console.log(rd.locked); //true
// 消费者
(async () => {
  while(true) {
    const { done, value } = await reader.read();
    if(done) {
      break;
    } else {
      console.log(value); 
    }
  }
})();
// 0 1 2 3 4
```

## 可写流

```js
async function* ints() {
  // 每一秒都生成一个递增的整数
  for(let i = 0; i < 5; i++) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}
// 创建可写流
const wt = new WritableStream({
  write(chunk) {
    // 获得写入数据
    console.log(chunk);
  }
});
// 未加锁
console.log(wt.locked); //false
// 获得写入器，加锁
const writer = wt.getWriter();
console.log(wt.locked); //true
// 生产者
(async () => {
  for await (const chunk of ints()) {
    await wt.ready;
    writer.write(chunk);
  }
  // 写入完成，关闭流
  writer.close();
})();
// 0 1 2 3 4
```

## 转换流

```js
async function* ints() {
  // 每一秒都生成一个递增的整数
  for(let i = 0; i < 5; i++) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}
const { writable, readable } = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk * 2);
  }
});

const reader = readable.getReader();
const writer = writable.getWriter();

// 消费者
(async () => {
  while(true) {
    const { done, value } = await reader.read();
    if(done) {
      break;
    } else {
      console.log(value); 
    }
  }
})();
// 生产者
(async () => {
  for await (const chunk of ints()) {
    await writable.ready;
    writer.write(chunk);
  }
  // 写入完成，关闭流
  writer.close();
})();
// 0 2 4 6 8
```

## 管道

- `pipeThrough()`
  -  `ReadableStream`
  - ` -> TransformStream.writableStream` 
  - ` -> TransformStream.readable`

- `pipeTo()`
  - `ReadableStream`
  - `-> WritableStream`

```js
async function* ints() {
  // 每一秒都生成一个递增的整数
  for(let i = 0; i < 5; i++) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}
// 创建可读流
const integerStream = new ReadableStream({
  async start(controller) {
    for await (const chunk of ints()) {
      controller.enqueue(chunk);
    }
    controller.close();
  }
});
// 创建转换流
const doublingStream = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk * 2);
  }
});
// 管道连接
const pipedStream = integerStream.pipeThrough(doublingStream);
// 从连接流获得读取器
const p_rd = pipedStream.getReader();
// 消费者
(async () => {
  while(true) {
    const { done, value } = await p_rd.read();
    if(done) {
      break;
    } else {
      console.log(value); 
    }
  }
})();
// 0 2 4 6 8
```

```js
async function* ints() {
  // 每一秒都生成一个递增的整数
  for(let i = 0; i < 5; i++) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}
// 创建可读流
const integerStream = new ReadableStream({
  async start(controller) {
    for await (const chunk of ints()) {
      controller.enqueue(chunk);
    }
    controller.close();
  }
});
// 创建可写流
const writableStream = new WritableStream({
  write(value) {
    console.log(value);
  }
});
// 管道连接, 隐式从 ReadableStream 获得了一个读取器，并把产生的值填充到 WritableStream
const pipedStream = integerStream.pipeTo(writableStream);
// 0 1 2 3 4
```

