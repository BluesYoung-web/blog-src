---
title: VueRouter—05-API
top_img: /img/vue.jpg
cover: /img/vue.jpg
categories:
  - 学习笔记
  - Vue
  - VueRouter
tags:
  - Vue
  - JavaScript
date: 2021-08-03 09:49:54
---

## `createRouter(options: RouterOptions)`

- 创建路由示例

### `RouterOptions`

#### `history`

- 历史模式：
  - `createWebHistory(base?: string)` `H5` 模式，**需要服务端配置支持**
  - `createWebHashHistory(base?: string)` `hash` 模式，无需服务器支持，**不利于 `SEO`**
  - `createMemoryHistory(base?: string)` 基于内存的历史记录，**主要用于处理 `SSR`**

#### `linkActiveClass`

- 用于激活 `RouterLink` 的默认类
- 默认值为 `router-link-active`

#### `linkExactActiveClass`

- 用于精准激活的 `RouterLink` 的默认类
- 默认值为 `router-link-exact-active`

#### `parseQuery`

- 用于解析查询的自定义实现
- `parseQuery?: (searchQuery: string) => Record<string, (string | null)[] | string | null>`

#### `stringifyQuery`

- 对查询对象进行字符串化的自定义实现

```js
stringifyQuery?: (
  query: Record<
    string | number,
    string | number | null | undefined | (string | number | null | undefined)[]
  >
) => string
```

#### `routes`

- 初始路由表

#### `scrollBehavior`

- 页面切换时的滚动表现(行为)

## `START_LOCATION`

- **路由所在的初始路由地址**

## Router 属性
