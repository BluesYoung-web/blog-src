---
title: vue3写法对比
top_img: /img/vue.jpg
cover: /img/vue.jpg
categories: Vue
tags: [Vue, 语法糖]
date: 2021-07-03 17:28:01
---

## 基础写法

```html
<template>
	<hello-world :msg="msg" @click="sayHello" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import HelloWorld from '/src/components/HelloWorld/index.vue';
export default defineComponent({
  props: {
    msg: { type: String, default: '你好' }
  },
  components: { HelloWorld },
  emits: ['hello'],
  setup(props, { emit }) {
    (async () => {
      const res = await fetch('https://www.xxx.com');
      console.log(await res.json());
    })();
    const sayHello = () => {
      alert('hello');
      emit('hello');
    };
    return {
      sayHello
    };
  }
})
</script>
```

## script-setup

```html
<template>
	<hello-world :msg="msg" @click="sayHello" />
</template>
<script setup>
import { ref, defineProps, defineEmit, useContext } from 'vue';
// 组件引入自动注册
import HelloWorld from '/src/components/HelloWorld/index.vue';

// 顶层 await，无需额外的 async
const res = await fetch('https://www.xxx.com').then((temp) => temp.json());
console.log(res);

// 变量自动暴露
const props = defineProps({ msg: { type: String, default: '你好' } });
const emit = defineEmit(['hello']);
const { slots, attrs } = useContext();
const sayHello = () => {
  alert('hello');
  emit('hello');
};
</script>
```

