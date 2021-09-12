---
title: vue3冷知识
date: 2021-09-12 16:26:09
top_img: /img/vue.jpg
cover: /img/vue.jpg
categories:
  - Vue
tags:
  - Vue
  - JavaScript
---

## `<style scoped>`

- 限制当前 `css` 样式局限于**当前组件**
- 父组件样式不会泄露到子组件之中

### 深度选择器

- 在父组件内控制子组件的样式
- `v-html` 所创建的 `DOM` 不受作用域样式的影响，但是可以通过 `:deep()` 来控制

```html
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

### 插槽选择器

- 默认情况下，作用域样式不会影响到 `<slot />` 渲染出来的内容
- 可以通过 `:slotted` 来实现对插槽内容的影响

```html
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### 全局选择器

- 如果想让作用域中的某个样式直接应用到全局
- 相较于另起一个 `<style></style>`，`:global()` 会更加优雅

## `<style module>`

- 会将内部的 `css` 类作为 `$style` 的属性暴露给 `<template>`
- 命名模块 `<style module="s1"> => s1` 

```html
<script setup>
const $style = useCssModule();
const s1 = useCssModule('s1');
    
const color_ccc = ref('#ccc');
const styleObj = ref({
	border: '1px solid red',
	backgroundColor: '#eee'
});
</script>
<style>
.a {
	color: v-bind('color_ccc');
	border: v-bind('styleObj.border');
	backrgound-color: v-bind('styleObj.backgroundColor');
}
</style>
```

## `is`

- `3.1+`
- 当 `is` 用于原生 `html` 元素时，它会被作为一个 **自定义内置元素** 进行转译
- `is="vue:component-name"` 会将元素渲染为对应的 **vue 组件**

## `v-memo="[...]"`

- 用于 `v-for` 性能优化(长度 > 1000)
- 当传入的数组中的每个值都与上次完全相同时，会直接跳过其子树的更新

## `defineCustomElement`

- `3.2+`
- 返回一个原生的 **自定义元素**（原生组件，不受限于框架）

```html
<template>
	<my-vue-element></my-vue-element>
</template>
<script>
import { defineCustomElement } from 'vue';
const MyVueElement = defineCustomElement({
  // 这里是普通的 Vue 组件选项
  props: {},
  emits: {},
  template: `...`,
  // 只用于 defineCustomElement：注入到 shadow root 中的 CSS
  styles: [`/* inlined css */`]
});
// 注册该自定义元素。
// 注册过后，页面上所有的 `<my-vue-element>` 标记会被升级。
customElements.define('my-vue-element', MyVueElement);
// 你也可以用编程的方式初始化这个元素：
// (在注册之后才可以这样做)
document.body.appendChild(
  new MyVueElement({
    // 初始化的 prop (可选)
  })
);
</script>
```

## `defineExpose`

- `<script setup>` 默认不会暴露任何内容给父级组件(通过 `$ref` 使用)
- 可以通过 `defineExpose()` 函数指定要暴露给父级组件的属性或方法

```html
<script setup>
import { ref } from 'vue';
const a = 1;
const b = ref(2);
defineExpose({
  a,
  b
});
</script>
```

## `v-model`

- `绑定值 | 触发事件 | 修饰符对象`
- 默认值 `v-model[:modelValue] | emit('update:modelValue', value) | props.modelModifiers`
- 自定义值 `v-model:page | emit('update:page', value) | props.pageModifiers`

- 当添加某个修饰符时，其对应的 **修饰符对象会拥有修饰符对应的属性，值为 true**

