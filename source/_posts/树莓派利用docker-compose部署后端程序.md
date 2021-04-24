---
title: 树莓派利用docker-compose部署后端程序
categories: 树莓派
tags:
  - 树莓派
  - linux
  - Docker
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
date: 2021-04-24 20:12:06
---

## 预期目标

- 使用 docker-compose 快速部署后端程序
- 涉及镜像：
  - MySQL 数据库的替代品 MariaDB
  - redis
  - node
  - nginx

## 安装

- 由于 docker-compose 官方并没有提供直接用于树莓派的安装包
- 所以只能通过 python 的 pip 曲线救国
- [具体安装步骤](https://www.jianshu.com/p/6fa65844e9a2)

## 配置文件

```yaml
# docker-compose 配置文件
version: '3.3'
services:
  mariadb:
    image: jsurf/rpi-mariadb
    ports: ['3306:3306']
    volumes: 
      - /home/pi/data-base/data:/var/lib/mysql
      - /home/pi/data-base/initdb.d:/docker-entrypoint-initdb.d
    environment: 
      MYSQL_ROOT_PASSWORD: 'my-secret-pw'
    restart: always
    networks:
      web-net:
        ipv4_address: 172.18.0.4
  redis:
    image: redis
    ports: ['6379:6379']
    restart: always
    networks:
      web-net:
        ipv4_address: 172.18.0.5
  node-server:
    image: node
    # 外部：内部
    ports: ['1443:1443', '9527:9527']
    volumes: 
      - /home/pi/node-server:/home/node
    restart: always
    depends_on: 
      - mariadb
      - redis
    networks:
      web-net:
        ipv4_address: 172.18.0.3
    command: /bin/bash -c "cd /home/node && node main.js"
  nginx-server:
    image: nginx
    ports: ['8080:80']
    volumes:
      - /home/pi/www/.nginx/nginx.conf:/etc/nginx/nginx.conf
      - /home/pi/www:/etc/nginx/html
    restart: always
    depends_on: 
      - node-server
    networks:
      web-net:
        ipv4_address: 172.18.0.2

networks: ##定义网络组
  web-net: ## 网络组名称
    driver: bridge ## 网络的模式
    ipam: ## 配置网络
      driver: default
      config:
        - subnet: 172.18.0.0/24
```

## 根据配置文件启动各个镜像

- 进入 `docker-compose.yml` 所在的目录
- 执行 `docker-compose up` 启动(调试期间推荐，可以方便看到是否出错)
- 调试成功之后可以添加 `-d` 参数使之运行在后台