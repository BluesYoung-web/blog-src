---
title: vite中使用momentjs本地化无效
categories: 遇到的问题及解决方案
date: 2021-12-15 17:31:46
tags: [vite, momentjs]
---

## 表现

- `moment.duration(100, 's').humanize()`结果一直显示为英文，无论是否增加 `.locale('zh-cn')`
- 导入对应的语言包也没有任何效果(`import 'moment/locale/zh-cn'`)

## 原因

- `vite` 不支持直接导入 `umd` 模块的源文件[(issues)](https://github.com/vitejs/vite/issues/945)

## 解决方法

- 导入 `dist` 内的 `ESM` 模块即可

```js
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
moment.duration(120, 's').humanize(); // 两分钟
```

