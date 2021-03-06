---
title: nginx报错MIME**
date: 2020-12-23 16:58:09
tags:
	- nginx
	- vite
	- vue
categories: 遇到的问题及解决方案
top_img: /img/nginx.jpg
cover: /img/nginx.jpg
---

## Resource interpreted as Stylesheet but transferred with MIME type text/plain

- 在引入模块化开发的`js`文件时，必须声明类型为 `module`
- 这样，浏览器就会将这个文件认为是`ECMAScript`模块
- 一般情况下业界或者官方会将这种模块文件使用 `mjs `命名
- `Nginx `会根据`mime type`定义的对应关系来告诉浏览器如何处理服务器传给浏览器的这个文件，一般默认`default_type application/octet-stream;`会对未定义的文件设置为该类型

```html
<script type="module" src="/src/main.ts"></script>
```

```nginx
server {
  http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    types {
        application/x-javascript              mjs;
    }
  }
}
```