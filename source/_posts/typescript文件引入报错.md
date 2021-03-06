---
title: typescript文件引入报错
date: 2020-12-23 16:36:06
tags:
	- TypeScript
	- Vue3
categories: 遇到的问题及解决方案
top_img: /img/ts.jpg
cover: /img/ts.jpg
---

## typescript文件引入报错

### vue文件引入报错

- `src`目录下新建 `shims.d.ts`

```typescript
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}
```

### ts 文件引入报错

- 使用相对路径引入

### 强行关闭报错

```typescript
// @ts-ignore       忽略当前文件
// @ts-ignore-line  忽略下一行
```

