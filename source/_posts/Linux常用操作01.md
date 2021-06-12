---
title: Linux常用操作01
categories: 树莓派
tags:
  - 树莓派
  - linux
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
date: 2021-06-12 17:38:49
---

## 命令别名固化

```bash
# 进入用户家目录
cd ~
# 编辑预处理文件
nano .bashrc
# 末尾加入命令
# eg:   alias cls='clear';
# 更新配置
source .bashrc
```

## 安装 node

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# 装载 nvm(配置环境变量)
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# 安装 node
nvm install node版本号
```

## 安装 deb 包

```bash
sudo dpkg -i 包名称
```

## 安装 `.tar.gz` 包

```bash
# 解压
tar xvf *.tar.gz
# 复制到常用的软件目录
cp -ar 解压之后的目录名 ~/软件
# 转到软件目录
cd ~/软件/目录名
# 给目标可执行文件添加软连接
sudo ln -s ~/软件/目录名/文件名 /usr/local/bin/文件名
# 启动软件
文件名
```

