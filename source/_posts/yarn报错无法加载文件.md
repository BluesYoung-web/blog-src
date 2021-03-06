---
title: yarn报错无法加载文件
date: 2020-12-23 15:14:25
tags:
	- npm
	- yarn
categories: 遇到的问题及解决方案
top_img: /img/node.jpg
cover: /img/node.jpg
---

## yarn --version 报错

- 无法加载文件` C:\Users\01\AppData\Roaming\npm\yarn.ps1`

## 解决方法

- 管理员身份运行 `powershell`
- 执行 `set-ExecutionPolicy RemoteSigned`