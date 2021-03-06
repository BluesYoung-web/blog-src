---
title: element-plus打包后字体文件丢失
date: 2020-12-23 16:30:33
tags:
	- Vue3
	- Element-Plus
	- 打包
categories: 遇到的问题及解决方案
top_img: /img/element.jpg
cover: /img/element.jpg
---

## 打包后提示字体文件丢失

- 实际上并没有丢失
- 只是莫名其妙多了一层 `_assets`
- **罪魁祸首->配置文件中设置的`base: './'`**
- 改为绝对路径之后就好了