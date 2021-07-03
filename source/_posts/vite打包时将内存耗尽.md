---
title: vite打包时将内存耗尽
categories: 遇到的问题及解决方案
date: 2021-07-03 16:51:13
tags: [vite, vue, node]
top_img: /img/vite.svg
cover: /img/vite.svg
---

## 问题

- 本地打包是没什么问题的，基本上内存占用也在 1.2 左右
- 但是运维可能会**同时执行多个任务**，此时如果不加限制就会导致**内存耗尽，机器卡死**

## 解决方法

### 1.限制 node  可以使用的内存

- 修改 `package.json` 的打包命令为 `build: node --max_old_space_size=1024 ./node_modules/.bin/vite build`
- **此命令只能在 linux 上运行**，Windows会报错

### 2.修改 vite 配置

```js
export default {
  // ...
  build: {
    // 不生成源码映射文件
    sourcemap: false,
    // 不生成压缩报告
    brotliSize: false
  }
}
```

## JSON 文件静态分离的方法

### 需求

- 只打包一次，所有的内容都可以通过 JSON 文件控制
- 后期只需要修改静态 JSON 文件即可

### 实现

1. 将 JSON 文件放入 public 目录
2. 使用的地方需要通过 `fetch.then` 或者 `axios.then` 获取

### bug

- **不能使用 import**，<span style="color: red">public目录下为静态文件，不能通过 js 直接引用</span>
- **不能使用 await**，可能是`<script setup>` 语法糖的 bug

## vite 引入 css 变量

- **`css`文件名称必须带有 `module` 字段**
- 可以与 `scss` 或者 `less` 结合
- 支持 `css`原生变量(`--color: red`)

```css
/* '/src/styles/variables.module.css' */
:export {
  --color-fff: #fff;
}
```

```html
<script lang="ts" setup>
import { ref } from 'vue';
import cssVar from '/src/styles/variables.module.css';
/**
 * cssVar = { --color-fff: #fff; }
 */
const data = ref();
fetch('/json/test.json')
  .then((res) => res.json())
  .then((dt) => data.value = dt);
</script>
```

