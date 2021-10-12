---
title: linux经常出现dns错误的问题
categories: 遇到的问题及解决方案
date: 2021-10-12 09:24:11
tags: [linux]
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
---

## linux 系统动不动就出现 dns 错误(内网)

```bash
sudo vim /etc/resolv.conf
# 对其内容做出以下修改
# 注释掉现有的 nameserver
nameserver 内网的 dns 服务器地址
nameserver 8.8.8.8
nameserver 8.8.4.4

# 修改完毕，保存即可生效
```

