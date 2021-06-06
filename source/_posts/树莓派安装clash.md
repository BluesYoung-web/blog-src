---
title: 树莓派安装clash
categories: 树莓派
tags:
  - 树莓派
  - linux
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
date: 2021-06-06 20:52:48
---

## 目标

- 给树莓派安装 clash
- 将其配置成科学上网的代理服务器

## 安装

- 首先[下载](https://github.com/Dreamacro/clash/releases)树莓派对应的 clash 版本(`clash-linux-armv7`)

```bash
# 解压
gunzip clash-linux-*.gz
# 移动解压后的文件
mv clash-linux-* /usr/local/bin/clash
# 修改权限
chmod a+x /usr/local/bin/clash
```

## 配置

```bash
# 运行 clash 生成初始配置文件
clash
# 普通用户 /home/pi/.config/clash/*
# root 用户 /root/.config/clash/*

# 修改配置文件 config.yaml

# 启用系统代理

# 编辑配置文件
sudo nano /etc/profile
# 在配置文件的尾部加入以下代码
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
# 重新加载环境变量
source /etc/profile
# 检测环境变量是否生效
env | grep http
# 启动 clash
clash
```

## 使用

- 局域网内的设备配置代理
- 将代理服务器设置为树莓派的 ip
- 端口号为配置文件之中的端口号(7890)

## windows 10 Chrome 无法正常访问

- edge 可以正常使用代理
- Chrome 确无法使用代理
- 安装 Chrome 浏览器插件 [Proxy SwitchyOmega](https://www.chrome666.com/chrome-extension/proxy_switchyomega.html)

- 将插件的代理服务器设置为树莓派，需要科学上网时，将插件选择为 proxy，其余状态选择直连

