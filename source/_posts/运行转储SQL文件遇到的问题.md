---
title: 运行转储SQL文件遇到的问题
categories: 遇到的问题及解决方案
date: 2021-07-30 16:57:03
tags: [MySQL, Linux]
top_img: /img/mysql.jpg
cover: /img/mysql.jpg
---

## 自增ID无法从 0 开始

- 曲线救国
- 现将要插入的第一条数据的自增id设为 -1(`INSERT`)
- 然后再将第一条数据的自增ID**修改**为0(`UPDATE`)

## 具有主从关系的表无法直接插入

- 先注释掉 `SQL` 文件中与主从表关联关系有关的语句
- 先将数据全部插入成功之后再去修改表结构

