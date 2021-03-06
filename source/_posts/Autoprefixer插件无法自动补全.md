---
title: Autoprefixer插件无法自动补全
categories: 
	- [遇到的问题及解决方案]
	- [工具]
date: 2020-12-24 09:59:26
tags:
	- 工具
---

## Autoprefixer

- VSCode 的 CSS3 前缀自动补全插件
- 安装后直接使用的话并不会由什么效果
- 需要手动修改配置文件(`settings.json`)

### 3.+ 版本

```json
"autoprefixer.formatOnSave": true,
"autoprefixer.options": {
    "browsers": [
        "last 3 versions",
        "ie >= 10",
        "ie_mob >= 10",
        "ff >= 30",
        "chrome >= 34",
        "safari >= 6",
        "ios >= 6",
        "android >= 4.4"
    ]
}
```

### 2.+ 版本

```json
"autoprefixer.browsers": [
    "last 3 versions",
    "ie >= 10",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 6",
    "ios >= 6",
    "android >= 4.4"
]
```

