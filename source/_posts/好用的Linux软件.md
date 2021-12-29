---
title: 好用的Linux软件
top_img: /img/skill.jpg
cover: /img/skill.jpg
categories: 奇技淫巧
tags: [奇技淫巧, Linux, 软件]
date: 2021-12-29 14:47:08
---

## tree

- 以字符形式输出目录结构

```bash
tree
###
.
├── bin
│   ├── createNewPage.js
│   └── package.json
├── dist
├── index.html
├── LICENSE
├── node_modules
├── package.json
├── public
│   └── favicon.ico
├── README.md
├── src
│   ├── api
│   │   ├── _config.ts
│   │   └── user.ts
│   ├── App.vue
│   ├── assets
│   ├── auto-components.d.ts
│   ├── auto-imports.d.ts
│   ├── components
│   │   └── YoungTable
│   │       ├── body.tsx
│   │       ├── group.tsx
│   │       ├── head.tsx
│   │       └── index.vue
│   ├── dev-static-config.ts
│   ├── env.d.ts
│   ├── hooks
│   │   └── useVerifyCode.ts
│   ├── main.ts
│   ├── permission.ts
│   ├── route
│   │   ├── index.ts
│   │   └── pages.json
│   ├── store
│   │   └── index.ts
│   ├── @types
│   │   ├── helper.d.ts
│   │   ├── socket.d.ts
│   │   ├── system.d.ts
│   │   ├── table.d.ts
│   │   └── types.d.ts
│   ├── util
│   │   ├── auth.ts
│   │   ├── deepClone.ts
│   │   ├── deepMerge.ts
│   │   ├── generateUserInfo.ts
│   │   ├── isType.ts
│   │   ├── net.ts
│   │   ├── numFormat.ts
│   │   ├── request.ts
│   │   ├── sleep.ts
│   │   ├── timeFormat.ts
│   │   ├── valid.ts
│   │   └── youngSocket.ts
│   ├── views
│   │   ├── 404.vue
│   │   ├── base
│   │   │   ├── login.vue
│   │   │   ├── register.vue
│   │   │   └── resetPasswd.vue
│   │   └── home
│   │       ├── address.vue
│   │       ├── find.vue
│   │       ├── home.vue
│   │       ├── main.vue
│   │       └── my.vue
│   └── young-common-expose.ts
├── tsconfig.json
├── vite.config.ts
├── windi.config.ts
└── yarn.lock

17 directories, 55 files
###
```

## ranger

- 基于终端的文件资源管理器
- 可以直接在命令行内浏览目录与预览文件

```bash
# 生成默认的配置
ranger --copy-config=all
# 编辑配置文件
nano ~/.config/ranger/rc.conf
```

## Tabby

- 一个高度可定制的开源终端软件
- [下载](https://github.com/Eugeny/tabby/releases/)

## 钉钉

- [官方 Linux 版本](https://alidocs.dingtalk.com/i/p/nb9XJlJ7QbxN8GyA/docs/nb9XJOPQ3K25LmyA)
