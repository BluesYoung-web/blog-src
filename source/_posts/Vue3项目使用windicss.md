---
title: Vue3项目使用windicss
top_img: /img/vue.jpg
cover: /img/vue.jpg
categories:
  - Vue
tags:
  - Vue
  - JavaScript
  - Vite
date: 2021-05-29 15:26:12
---

## 环境要求

- `node >= 12`，推荐使用 `12.13.0`

## 安装

- `yarn add vite-plugin-windicss windicss -D`

## 引入插件

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import Windicss from 'vite-plugin-windicss';
export default defineConfig({
  plugins: [
    // ...,
    Windicss()
  ],
  // ...
})
```

## 引入基础类与组件

```typescript
// main.ts
// 引入 windicss 的样式
// 不引入 windi-base 是为了防止影响现有的样式，引入另外的两个是保证 windicss 可以正常使用
// import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
```

## 使用

- 既可以直接在类属性中直接书写
- 又可以使用 `@apply` 组合样式
- 使用方式基本兼容 `tailwindcss`

```html
<template>
  <young-tabs v-model="activeTab" :tabs-menu="tabsMenu">
    <template #t1>
      <h1 class="h1-test">我是标签页1</h1>
    </template>
    <template #t2>
      <h1 class="js-in-css" @click="color='skyblue'">我是标签页2</h1>
    </template>
    <template #t3>
      <h1 class="text-blue-900 lg:text-red-500 text-stroke-sm text-stroke-blue-gray-500 via-red-700">我是标签页3</h1>
    </template>
  </young-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const tabsMenu = ref<TabItem[]>([
  { label: 'tab1', name: 't1' },
  { label: 'tab2', name: 't2' },
  { label: 'tab3', name: 't3' }
]);
const activeTab = ref('t1');
const color = ref('red');
</script>

<style lang="postcss" scoped>
.h1-test {
  @apply text-9xl text-center text-blue-600 sm:bg-black;
}
.js-in-css {
  color: v-bind(color);
}
</style>
```

## 消除编辑器报错(警告)

- 直接将 `style` 标签的 `lang` 属性赋值为 `postcss`
