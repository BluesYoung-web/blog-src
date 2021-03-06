---
title: Vue3引入外部js文件
date: 2020-12-23 16:26:27
tags: Vue3 
categories: 遇到的问题及解决方案
top_img: /img/vue.jpg
cover: /img/vue.jpg
---

## Vue3 引入外部js文件无效(Vite)

- 必须加入 `type="module"`， 否则打包之后无法使用

```html
<!-- 引入特效 -->
<script type="module" src="/src/assets/js/number-rain.js"></script>
```