---
title: Vue3中的ref属性
date: 2020-12-23 16:17:38
tags: Vue3
categories: 遇到的问题及解决方案
top_img: /img/vue.jpg
cover: /img/vue.jpg
---

## Vue3 中的 ref 属性

- 使用 CompositionAPI 写法的时候`ref属性` 与 `表单对象` 不能相同，否则会丢失响应
- 坑死人不偿命

```html
<template>
	<form ref="formRef" v-model="form"></form>
</template>
<script>
import { ref } from 'vue';
export default {
    setup(){
        const formRef = ref(null);
        const form = ref(null);
        return {
            formRef,
            form
        }
    }
}
</script>
```

