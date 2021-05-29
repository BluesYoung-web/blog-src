---
title: Linux开机自启与内存管理
categories: 树莓派
tags:
  - 树莓派
  - linux
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
date: 2021-05-16 20:33:19
---

## systemctl

```bash
# 启动服务
sudo systemctl start docker.service
# 关闭服务
sudo systemctl stop docker.service
# 重启服务
sudo systemctl restart docker.service
# 开机时启用服务(设置开机自启)
sudo systemctl enable docker.service
# 开机时禁用服务(禁用开机自启)
sudo systemctl disable docker.service
# 查看服务是否开机自启
sudo systemctl is-enable docker.service
# 查看已启动的服务列表
sudo systemctl list-unit-files|grep enabled
# 查看启动失败的服务列表
sudo systemctl --failed
```

## ps

```bash
# 显示现行终端机下的所有程序，包括其他用户的程序
ps a
# 显示所有程序
ps -A
# 列出程序时，显示每个程序真正的指令名称，而不包含路径，参数或常驻服务的标示
ps c
# 此参数的效果和指定"A"参数相同
ps -e
# 列出程序时，显示每个程序所使用的环境变量
ps e
# 用ASCII字符显示树状结构，表达程序间的相互关系
ps f
# 显示树状结构，表示程序间的相互关系
ps -H
# 显示所有的程序，除了执行ps指令终端机下的程序之外
ps -N
# 采用程序信号的格式显示程序状况
ps s
# 列出程序时，包括已中断的子程序资料
ps S
# 指定终端机编号，并列出属于该终端机的程序的状况
ps -t <终端机编号>
# 以用户为主的格式来显示程序状况
ps u
# 显示所有程序，不以终端机来区分
ps x
# 最常用的方法是ps aux,然后再通过管道使用grep命令过滤查找特定的进程,然后再对特定的进程进行操作
# 显示出所有的java进程，去处掉当前的grep进程
ps -ef|grep java|grep -v grep
```

