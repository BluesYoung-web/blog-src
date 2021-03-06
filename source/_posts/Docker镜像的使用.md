---
title: Docker镜像的使用
date: 2020-12-23 16:05:41
tags:
	- Docker
	- Linux
categories: [树莓派, Docker]
top_img: /img/docker.jpg
cover: /img/docker_cover.jpg
---

## 查看本地镜像

```bash
docker images
# REPOSITORY    		TAG    		IMAGE ID     CREATED      SIZE
# node          		latest 		338eedef62b1 2 weeks ago  766MB
# nginx         		latest 		d58dafbce171 3 weeks ago  102MB
# redis         		latest 		6afef9e2c5e4 4 weeks ago  76MB
# portainer/portainer   latest 		dbf28ba50432 4 months ago 62.5MB
# 仓库源				  标签/版本    镜像ID			创建时间	  大小
```

## 获取指定版本的镜像

```bash
docker pull node:12.8.1
# REPOSITORY node
# TAG 12.8.1
```

## 查找镜像

```bash
docker search node
# NAME   DESCRIPTION                STARS    OFFICIAL  	 AUTOMATED
# node   Node.js is a JavaScript…   9418     [OK]                
# 名称    描述						 点赞数    是否官方发布  自动构建
```

## 删除镜像

```bash
docker rmi node
```