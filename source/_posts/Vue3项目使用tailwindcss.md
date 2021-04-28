---
title: Vue3项目使用tailwindcss
top_img: /img/vue.jpg
cover: /img/vue.jpg
categories:
  - Vue
tags:
  - Vue
  - JavaScript
  - Vite
date: 2021-04-28 15:23:22
---

## 环境要求

- `node >= 12.13.0`

## 安装

```bash
yarn add -D tailwindcss postcss autoprefixer
```

## 生成配置文件

```bash
npx tailwindcss init -p
```

## 修改配置文件

- 修改 `tailwind.config.js` 的 `purge` 配置，启用摇树优化
- 默认只有在**生产模式**时才有效，可以[自定义修改](https://www.tailwindcss.cn/docs/optimizing-for-production#html)

```js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

## 使用

```html
<template>
  <young-tabs v-model="activeTab" :tabs-menu="tabsMenu">
    <template #t1>
      <h1 class="h1-test">我是标签页1</h1>
    </template>
    <template #t2>
      <h1>我是标签页2</h1>
    </template>
    <template #t3>
      <h1>我是标签页3</h1>
    </template>
  </young-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'Tabs',
  setup() {
    const tabsMenu = ref<TabItem[]>([
      { label: 'tab1', name: 't1' },
      { label: 'tab2', name: 't2' },
      { label: 'tab3', name: 't3' }
    ]);
    const activeTab = ref('t1');
    return {
      tabsMenu,
      activeTab
    };
  }
});
</script>

<style scoped>
/* 引入 tailwind */
/*! @import */
@tailwind base;
@tailwind components;
@tailwind utilities;
.h1-test {
  @apply text-9xl text-center text-blue-600 sm:bg-black;
}
</style>
```

### 消除编辑器报错(警告)

- 安装 [stylelint插件](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- 打开首选项 -> 搜索 `css.va` -> 禁用编辑器内置的(`css | less | scss`验证)
- 打开 `settings.json` ，将以下内容设置为 `stylelint.config` 的值

```json
{
  "rules": {
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "tailwind",
        "apply",
        "layer",
        "variants",
        "responsive",
        "screen"
      ]
    }],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null
  }
}
```

- 重启编辑器，大功告成(强迫症的福音)