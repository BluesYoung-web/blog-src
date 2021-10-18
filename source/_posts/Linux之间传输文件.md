---
title: Linux之间传输文件
top_img: /img/skill.jpg
cover: /img/skill.jpg
categories: 奇技淫巧
tags:
  - 奇技淫巧
date: 2021-10-18 16:06:02s
---

## Linux 之间传输文件

### scp

```bash
scp -r -P 远程主机端口号 远程主机用户名@远程主机地址:/远程目录  当前主机目录
# 基础使用，将 test1 主机上的 1.txt 复制到 test2 主机上并重命名为 1-copy.txt
# scp test1@test.com:/home/test1/1.txt test2@test.com:/home/test2/1-copy.txt
# 复制目录需要加上 -r
# ！！！此处最容易出错，指定端口号需要使用 -P
```

### rsync

- 类似于 scp
- 还支持排除目录、限速等功能

### rcp

- 需要目标主机先打开 rcp 功能，并设置好 rcp 权限
- 然后将源主机加入信任白名单
- 操作比较麻烦

### wget

- 只能从远程主机下载文件
