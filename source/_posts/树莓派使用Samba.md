---
title: 树莓派使用Samba
categories: 树莓派
tags:
  - 树莓派
  - linux
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
date: 2021-04-10 20:18:01
---

## 安装 Samba

```bash
# 更新现有的软件包
sudo apt-get update
# 安装 Samba 及其常用的命令包
sudo apt-get install samba samba-common-bin
# 重启系统
sudo reboot
# 编写配置文件
sudo nano /etc/samba/smb.conf
# -------------
# [共享目录显示的名称]
# comment = Public Storage
# path = 共享目录的路径
# read only = no        #任何人都具有了访问修改的权限；因为是公共文件夹，所以给了所有用户全部权限，可以自定义
# create mask = 0777    #新创建文件的默认属性
# directory mask = 0777 #新创建文件夹的默认属性
# guest ok = yes        #默认的访问用户名为guest
# browseable = yes
# -------------
# 将系统用户添加为 Samba 用户
sudo smbpasswd -a pi    #输入两次密码
# 重启 Samba 服务
sudo samba restart
```

## 挂载移动硬盘

- 由于移动硬盘的格式为 NTFS
- 但是树莓派文件系统的格式为 EXT4
- 所以当我直接将硬盘插上去的时候不能直接识别

### 差点玩蹦树莓派的坑

- 百度到一个通过修改 fstab 配置文件来识别 NTFS 硬盘的
- 然后我照着修改了
- 重启——
- 系统都进不去了......

### 当时的情况

- 树莓派进不去系统
- 没有空闲的键盘和显示器
- 没有多的内存卡
- 把树莓派的 SD 卡插到电脑上又不能识别出真实的内容
- 整个人都不好了

### 柳暗花明

- 想起来我还有一个 ElementaryOS 的启动盘
- 然后那个可以不安装直接运行
- 皇天不负苦心人，我终于用它直接读取到了树莓派 SD 卡中的真实内容
- 然后我删掉了那一行配置，保存
- 树莓派终于又可以正常使用了

### 最终找到的解决方案

- 拔掉硬盘
- `sudo apt-get install exfat-fuse -y`

- 插入硬盘
- 就是这么简单
- 再也不敢乱改树莓派的配置文件了，，，