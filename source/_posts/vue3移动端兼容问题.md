---
title: vue3移动端兼容问题
categories: 遇到的问题及解决方案
date: 2021-08-06 17:23:33
tags: [Vue3, 移动端, 兼容]
top_img: /img/vue.jpg
cover: /img/vue.jpg
---

## 移动端调试

```html
<script src="https://cdn.bootcdn.net/ajax/libs/vConsole/3.9.0/vconsole.min.js"></script>
<script>
new VConsole();
</script>
```

## 问题表现

- 微信内置浏览器可以正常打开
- `vivo` 内置浏览器无法正常打开

## 原因定位

- 微信内置浏览器的内核 `Chrome/86.0.4240.99`
- `vivo` 浏览器内核 `Chrome/62.0.3202.84`
- 好巧不巧，**刚好 `Chrome62`不支持动态 import**
- [caniuse-import](https://www.caniuse.com/?search=import)

```js
Uncaught SyntaxError: Unexpected token import
/share/assets/index.72e63794.js:1:771 SyntaxError: Unexpected token import
```

## 解决方案

### 简单粗暴

- 直接修改 `vite.config.ts`，启用前期为了加快打包速度而禁用的 `renderLegacyChunks`

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 不生成同名 polyfill 文件，打包速度翻倍
    // 如果出现兼容问题，可以删除此配置
    // legacy({ renderLegacyChunks: false })
    legacy()
  ]
})
```

### 迫不得已

- 使用 `Vue2` 重写
- 兼容性更好

## `HTML` 原始模板

```html
<!DOCTYPE html>
<html lang="en">
  <head>
     <script>
    /**
     * 全局错误捕获
     */
    window.onerror = function () {
      window.alert('您的浏览器版本过低，请尝试使用其他浏览器或将浏览器升级至最新版本后重试！');
    }
    </script>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0">
    <meta name="format-detection" content="telephone=no,email=no,date=no,address=no">
    <!--
    <script src="https://cdn.bootcdn.net/ajax/libs/vConsole/3.9.0/vconsole.min.js"></script>
    <script>
    new VConsole();
    </script>
    -->
	<title>分享</title>
  </head>
  <body>
    <noscript>请启用 JavaScript 以获得最佳体验</noscript>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

