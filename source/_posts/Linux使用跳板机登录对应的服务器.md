---
title: Linux使用跳板机登录对应的服务器
categories: 树莓派
tags:
  - 树莓派
  - linux
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
date: 2021-07-28 19:53:42
---

## Linux下跳板机的使用

- 跳板机(堡垒机)可用于服务器隔离与精准的权限控制
- 一般会有一个 `.pem` 的文件

```bash
# 将权限调小一点(如果连接正常可以直接忽略)
sudo chmod 400 username.pem
# 连接
ssh -i username.pem -p 对应的端口号 username@跳板机的域名或IP
```

