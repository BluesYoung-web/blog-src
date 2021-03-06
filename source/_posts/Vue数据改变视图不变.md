---
title: Vue数据改变视图不变
date: 2020-12-23 17:02:51
tags: 
	- Vue
	- 技巧
categories: 遇到的问题及解决方案
top_img: /img/vue.jpg
cover: /img/vue.jpg
---

## Vue 数据改变而视图不变

- `@change="() => $forceUpdate()"`
- 强制刷新视图