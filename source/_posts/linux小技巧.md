---
title: linux小技巧
top_img: /img/skill.jpg
cover: /img/skill.jpg
categories: 奇技淫巧
tags: [奇技淫巧, Linux]
date: 2021-12-03 09:01:14
---

## 忽略特定包的升级信息

```bash
# 将特定的包固定为当前版本
sudo apt-mark hold 包名
# 执行升级，就不会再自动升级对应的包了
sudo apt-get upgrade
```

## Docker 容器赋予真实的 root 权限

```bash
docker run -it \
--name=test \
# 赋予 root 权限
--privileged \
# 使用的镜像
node:lts \
# 用来交互的命令行
/bin/bash
```

