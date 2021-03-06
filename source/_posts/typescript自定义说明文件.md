---
title: typescript自定义说明文件
categories: 遇到的问题及解决方案
date: 2021-03-06 14:34:05
tags: [VSCode, TypeScript]
---

## 使用 TypeScript 时需要不断引入对应的自定义说明文件

1. 在 `src` 目录下新建 `@types` 目录
2. 编写对应的 `.d.ts` 文件
3. **不要 export**，否则会被识别为模块

```ts
// 无需引入
interface Form {
  username: string;
  password: string;
};
// 需要手动引入
export interface Form {
  username: string;
  password: string;
};
import { Form } from '***';

let form: Form = { username: '张三疯', password: '123456' }；
```

