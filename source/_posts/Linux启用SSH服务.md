---
title: Linux启用SSH服务
categories: 树莓派
tags:
  - 树莓派
  - linux
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
date: 2021-08-11 18:50:04
---

## 启用 ssh 服务

```bash
# 安装服务器端程序
sudo apt-get install openssh-server
# 查看服务是否已经启动
ps -e | grep ssh
# 如果出现 sshd 就是已经启动了

# 启动 | 关闭 | 重启服务
sudo service ssh start | stop | restart

# 编辑配置文件
sudo nano /etc/ssh/sshd_config
```

