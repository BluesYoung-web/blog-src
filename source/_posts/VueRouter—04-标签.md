---
title: VueRouter—04-标签
top_img: /img/vue.jpg
cover: /img/vue.jpg
categories:
  - 学习笔记
  - Vue
  - VueRouter
tags:
  - Vue
  - JavaScript
date: 2021-08-02 17:17:44
---

## `<router-link>`

### `props`

- `to: RouteLocationRaw` 目标路由的链接，点击之后会被作为参数传入 `router.push()`
- `replace: boolean = false` 是否使用 `router.replace()` 进行路由跳转(不会留下历史记录)
- `active-class: string = 'router-link-active'` 链接激活时，应用于 `a` 标签的 `class`
- `aria-current-value: string = 'page'` 链接激活时，传递给属性 `aria-current` 的值

- `custom: boolean = false` `<router-link> 默认将其内容包裹在 <a> 之中，传递 true 可以阻止其默认行为`

- `exact-active-class: string = 'router-link-exact-active'` 链接**精准激活**时，应用于 `a` 标签的 `class`

### `v-slot`

- 通过一个作用域插槽暴露底层的定制能力
- `route`: 解析后的规范化的地址
- `href`: 解析后的 `URL(base)`
- `isActive`: 如果需要应用 `active-class` 则为 `true`
- `isExactActive`: 如果需要应用 `exact-active-class` 则为 `true`
- `navigate` 触发导航的函数，会在必要的时候自动阻止事件

```html
<router-link
  to="/foo"
  custom
  v-slot="{ href, route, navigate, isActive, isExactActive }"
>
      <li  :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
          	 <!-- 当 target="_blank" 时，必须省略 @click="navigate"  -->
       		 <a :href="href" @click="navigate">{{ route.fullPath }}</a>
      </li>
</router-link>
```

## `<router-view>`

### `props`

- `name: string = 'default'` 如果设置了 `name` 属性，则会渲染对应路由配置中的 `components` 下的相应组件
- `route: RouteLocationNormalized` 一个路由地址的所有组件都已经被解析

### `v-slot`

```html
<Suspense>
  <template #default>
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <keep-alive>
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
        </keep-alive>
      </transition>
    </router-view>
  </template>
  <template #fallback> Loading... </template>
</Suspense>
```

