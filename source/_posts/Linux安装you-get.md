---
title: Linux安装you-get
categories: 树莓派
tags:
  - 树莓派
  - linux
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
date: 2021-08-16 16:07:31
---

## Linux 安装 you-get

```bash
# 安装Python3
sudo apt-get install python3
# 安装 pip3
sudo apt-get install python3-pip
# 安装 you-get
pip3 install you-get
# 更新
pip3 install  --upgrade you-get
```

### 安装完成之后找不到命令

```bash
# 查看 you-get 的安装路径
pip3 show you-get
# 添加软连接
sudo ln -s /home/username/.local/bin/you-get /usr/bin/you-get
# 查看版本
you-get -V
```

