---
title: 树莓派使用ftp
categories: 树莓派
tags:
  - 树莓派
  - linux
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
date: 2021-04-18 18:59:14
---

## 安装 vsftpd

```bash
# 更新现有依赖包
sudo apt-get update
# 安装 vsftpd
sudo apt-get install vsftpd
# 修改配置文件
sudo nano /etc/vsftpd/vsftpd.conf
# local_root=/要共享的目录，默认为当前用户的 home 目录
# 重启服务
sudo service vsftpd restart
```

