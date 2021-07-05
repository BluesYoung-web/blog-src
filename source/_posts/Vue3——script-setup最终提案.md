---
title: Vue3——script-setup最终提案
top_img: /img/vue.jpg
cover: /img/vue.jpg
categories: [Vue]
tags:
  - Vue
  - 语法糖
date: 2021-07-05 10:35:52
---

## 基础

- **所有**定义的**变量**都会被暴露给模板
- **所有引入的组件**都会**自动注册**
- 所有引入的自定义指令也会被自动注册
- **顶层**`await`，无需使用 `async` 包裹

## 定义 props 和 emits

```html
<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue';

interface Props {
  msg?: string;
};
const props = withDefaults(defineProps<Props>(), { msg: 'hello world' });

// const emit = defineEmits(['change', 'update']);
interface Emits {
  (e: 'change', id: number): void;
  (e: 'update', value: string): void;
};
const emit = defineEmits<Emits>();
</script>
```

## 使用 slots 和 attrs

```html
<script setup>
import { useSlots, useAttrs } from 'vue';

const slots = useSlots();
const attrs = useAttrs();
</script>
```

## 暴露组件属性

```html
<script setup>
import { ref, defineExpose } from 'vue';
const a = 1;
const b = ref(2);
defineExpose({ a, b });
</script>
```

## 其他

- 可以和普通的 `script` **同时使用**
- 一般情况下，组件的 **`name` 属性默认为其文件名**

```html
<script lang="ts">
// 确实需要 name 属性的时候
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ComponentName'
});
</script>
<script setup>
const a = 1;
</script>
```

