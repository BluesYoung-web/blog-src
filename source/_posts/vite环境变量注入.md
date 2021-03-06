---
title: vite环境变量注入
date: 2020-12-23 16:43:01
tags:
	- vite
	- vue
	- 技巧
categories: node
top_img: /img/vite.jpg
cover: /img/vite.jpg
---

## Vite 中的环境变量

### 文件名

- `.env.[mode].[local]`

### 规则

- 变量名必须以`VITE_`开头
- 在应用代码中使用 `import.meta.env.变量名`获取

## 使用不同的语句执行不同的环境

### package.json

```json
{
  "scripts": {
    "dev": "SET NODE_ENV=development&& vite",
    "dev:test": "SET NODE_ENV=test&& vite --mode test",
    "dev:prod": "SET NODE_ENV=production&& vite --mode production",
    "build:dev": "SET NODE_ENV=development&& SET IS_ONLINE=true&& vite build --mode development",
    "build:test": "SET NODE_ENV=test&& SET IS_ONLINE=true&& vite build --mode test",
    "build": "SET NODE_ENV=production&& SET IS_ONLINE=true&& vite build"
  }
}

```

### vite.config.ts

```typescript
const { resolve } = require('path');
const fs = require('fs');

// Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中
const dotenv = require("dotenv");

const envFiles = [
  /** default file */ `.env`,
  /** mode file */ `.env.${process.env.NODE_ENV}`
];

for (const file of envFiles) {
  const envConfig = dotenv.parse(fs.readFileSync(file));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}
// 打包的文件没有代理，直接换为原地址；
// 如果此处不换则需后端设置 nginx 代理
if (process.env.IS_ONLINE) {
  fs.writeFileSync('.env.local', 'VITE_ONLINE_FLAG = true', 'utf-8');
} else {
  try {
    fs.unlinkSync('.env.local');
  } catch (error) {
    null;
  }
}


module.exports = {
  // ***
  proxy: {
    [process.env.VITE_API]: {
      target: process.env.VITE_BASE_HTTP,
      changeOrigin: true,
      // 此处替换的字符会拼接于真实请求之后，按需修改
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
};
```

### baseUrl

```typescript
/**
 * 请求地址
 */
const IS_ON_LINE = (import.meta.env as any).VITE_ONLINE_FLAG;
/**
 * 本地开发版使用代理路径，打包发布版使用真实路径
 */
const BASE_URL = !!IS_ON_LINE ? (import.meta.env as any).VITE_BASE_HTTP : (import.meta.env as any).VITE_API;
```

> 如果后端配置了 nginx 代理的话，就不用这么麻烦了。开发和打包都可以使用同一地址(绝对路径)