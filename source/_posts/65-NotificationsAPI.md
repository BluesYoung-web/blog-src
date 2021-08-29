---
title: 65-NotificationsAPI
top_img: /img/hbs.png
cover: /img/hbs.png
categories:
  - 学习笔记
  - JavaScript高级程序设计
  - 第20章——JavaScriptAPI
tags:
  - JavaScript高级程序设计第四版
  - JavaScript
date: 2021-01-29 14:54:08
---

- 可以在页面不活跃时向用户显示消息(`win10`的通知)
- 允许页面处理用户与通知弹层的交互
- 通知只能运行在**安全上下文**的代码中被触发
- 通知必须按照每个源的原则**明确得到用户允许**

## `Notification.requestPermission()`

- 向用户请求通知权限
- 返回一个 `Promise`：
  - `granted` 同意
  - `denied` 拒绝
- **一旦拒绝就无法通过编程方式返回，因为不可能再触发授权提示**

```js
async function hasPermission() {
  const res = await Notification.requestPermission();
  return res === 'granted';
}
hasPermission().then(console.log); // true
```

## 显示和隐藏通知

- `const n = new Notification('title', configOptions)` 创建通知实例
- `n.close()` 关闭显示的通知

```js
const msg = new Notification('我是标题', {
  body: '我是主体',
  image: '我是背景图',
  vibrate: true,
  icon: '我是小图标',
  badge: '我是徽标'
});
msg.onshow = () => console.log('显示---------');
msg.onclick = () => console.log('点击---------');
msg.onclose = () => console.log('关闭---------');
msg.onerror = () => console.log('出错---------');

setTimeout(() => msg.close(), 5000);
```

## 页面可视状态

- `document.visibilityState`：
  - `hidden`
  - `visible`
  - `prerender`

- `window.addEventListener('visibilitychange')` 可见状态变化时触发
- `document.hidden` 是否隐藏，返回布尔值