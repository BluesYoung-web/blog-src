---
title: Nginx
top_img: /img/nginx.jpg
cover: /img/nginx.jpg
categories: [学习笔记]
tags: [Nginx]
date: 2021-09-27 15:17:00
---

## 定义

- 一个高性能的 **HTTP** 和 **反向代理** web 服务器
- 同时也提供了 `IMAP/POP3/SMTP` 服务

## 优缺点

### 优点

- **高并发量**
  - 采用**异步非阻塞**的方式来处理请求，支持高达 `50,000` 个并发连接
- **内存消耗小**
  - 采用事件处理方式，无需创建线程
  - 每个请求占用的内存很少，也没有上下文切换
- 配置简单(`conf` 文件配置)
- 性能稳定(分段资源分配技术，使得 `CPU` 和内存占有量非常低)
- 模块化程度高(高度模块化设计)
- 支持 `Rewrite` 重写
  - 能根据域名(`URL`)将 `http` 请求分配到不同的服务器
- 低成本(开源免费)
- 内置健康检查
  - 当某台服务器宕机的时候，会继续请求其他服务器
  - 不影响前端访问
- 节省带宽(`gzip`)
- 支持**热部署**
  - 启动容易，并且可以 `7 * 24` 不间断运行
  - 还能够在不间断服务的情况下对软件的版本进行升级

### 缺点

- 适用范围小，仅支持 `http | https | email` 协议
- 不支持 `url` 检测
- 不支持 `Session` 保持(可以通过 `ip_hash` 解决)

## 原理

- `nginx` 以**多进程**的方式来工作，采用**异步非阻塞**的方式来处理请求

- `nginx` 启动之后会有**一个 master 进程和多个 worker 进程**
- **master 进程**
  - 接收来自外界的信号
  - 向各 worker 进程发送信号
  - 监控 worker 进程的运行状态，当 worker 进程异常退出时自动启动新的 worker 进程
- **worker 进程**
  - 处理来自客户端的请求
  - 各个进程之间相互独立，一个请求只可能在一个 worker 进程中处理
  - **worker 进程数量可配置，一般同 cpu 数量**

- 多进程的好处：
  - 进程独立，无需加锁
  - 进程之间互不影响，一个进程退出之后其他进程正常工作

## 常用命令

```bash
sudo nginx -s reopen 	#重启Nginx
sudo nginx -s reload 	#重新加载Nginx配置文件，然后以优雅的方式重启Nginx
sudo nginx -s stop   	#强制停止Nginx服务
sudo nginx -s quit   	#优雅地停止Nginx服务（即处理完所有请求后再停止服务）
sudo nginx -h 		    #打开帮助信息
sudo nginx -v 		    #显示版本信息并退出
sudo nginx -V		    #显示版本和配置选项信息，然后退出
sudo nginx -t		    #检测配置文件是否有语法错误，然后退出
sudo nginx -T	 	    #检测配置文件是否有语法错误，转储并退出
sudo nginx -q 	  	    #在检测配置文件期间屏蔽非错误信息
sudo nginx -p prefix   	#设置前缀路径(默认是:/usr/share/nginx/)
sudo nginx -c filename	#设置配置文件(默认是:/etc/nginx/nginx.conf)
sudo nginx -g directives #设置配置文件外的全局指令
sudo killall nginx		#杀死所有nginx进程
```

## 配置文件的组成

### `main`

- 配置文件从开始到 `events` 之前的内容
- **影响 `nginx` 服务器整体的运⾏**
- 可配置内容：
  - 用户和用户组
  - 派生子进程数
  - 错误日志的位置与级别
  - `pid` 的位置
  - 子进程优先级
  - 进程对应的 `cpu`
  - 能够打开的进程描述符数
  - ...

```nginx
 # 用户
user www-data;
# 工作线程数
worker_processes auto; 
# pid 位置(进程文件)
pid /run/nginx.pid;
# 导入启用的 模块
include /etc/nginx/modules-enabled/*.conf;
```

### `events`

- **影响 `nginx` 服务器与用户网络的连接**

- 可配置内容：
  - 是否开启对多 `work process` 下的网络连接进行序列化
  - 是否允许同时接受多个网络连接
  - 选取何种事件驱动模型来处理连接请求
  - 每个 `work process` 可以同时支持的最大连接数

```nginx
events {
    	# 单进程并发最大连接数
        worker_connections 768;
    	# 启用同时接受多个网络连接
        # multi_accept on;
}
```

### `http`

#### `main`

- `http` 全局块
- 文件引入
- `MIME-TYPE` 定义
- 日志自定义
- 连接超时的时间
- 单链接请求数上限
- 负载均衡

```nginx
http {
    	##
        # 基础配置
        ##
    	# 启用高效文件传输模式
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
    	# 设置长连接超时时间，秒
        keepalive_timeout 65;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;
		# 导入 mime 文件类型
        include /etc/nginx/mime.types;
    	# 设置默认的 mime 类型(直接下载)
        default_type application/octet-stream;
    
    	##
        # SSL 配置
        ##
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;
		
    	##
        # 日志配置
        ##
   		# 设置日志的格式
    	log_format  main  '$http_user_agent $remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;
    
   		##
        # Gzip 配置
        ##
        gzip on;

        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascrip$

    	 # 负载均衡
        upstream myserver {
            server 192.168.1.101:8080;
            server 192.168.1.101:8081;
            server 192.168.1.101:8082;
        }
        server {
            listen      8070;
            server_name _;
            location / {
                proxy_pass http://myserver;
            }
        }
    
        ##
        # 虚拟主机配置
        ##
		# 导入众多的子配置(server)
        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}
```

#### `server`

- 每一个 `server` 块都相当于一个虚拟主机
- 常用配置：
  - 监听端口
  - 主机域名
  - 自定义错误页面

```nginx
http {
    server {
        listen 80 ;
		server_name localhost ;
        root /www/admin/localhost_80/wwwroot/ ;
        #301重定向
        #rewrite ^(.*)$ $1 permanent;
        #强制SSL
        #rewrite ^(.*)$  https://$host$1 permanent;
        error_page  404  /error/404.html;
    }
}
```

##### `location`

- 用于匹配不同 `uri` 的请求
- 匹配规则：
  - `=` 精准匹配，必须完全一致才会执行
  - `~` **区分大小写**的正则匹配
  - `~*` **不区分大小写**的正则匹配
  - `^~` 不使用正则表达式，完成以指定模式开头的匹配
  - `any str` 普通匹配
  - `@`定义一个只能被内部使用的配置

- 优先级 `= ` -> `^~` -> `~ | ~*` -> `any str`
- [反向代理](https://blog-src-rose.vercel.app/2021-07-26-nginx%E9%85%8D%E7%BD%AE%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86.html)

```nginx
server {
    # VueRouter history 模式
    location / {
        root        /data/wwwroot/promoter/;
        try_files   $uri $uri/ /index.html;
    	index       index.html;
    }
    # 权限控制(ip白名单)
    location / {
          alias html/aliastes/;
          allow 192.168.1.102;
          allow 192.168.1.103;
          deny all;
    }

    # 反向代理配置(跨域)
     location ^~ /api/ {
        	# 设置请求头
            proxy_set_header    X-Real-IP $remote_addr;
            proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
			# 反向代理的地址
            proxy_pass          http://localhost:9501;
        	# 服务器超时时间
        	# proxy_connect_timeout 60;
        	# 服务器发出 read 请求之后的超时时间
        	# proxy_read_timeout 60;
        	# 服务器发出 send 请求之后的超时时间
        	# proxy_send_timeout 60;
        	# 修改相应头之中的 Location 和 hash
        	# proxy_redirect  xxx;
        
        	# 启用服务器缓存，将请求内容缓存到本地，如果不手动删除则一直有效
        	# proxy_store on;
        	# proxy_store_access xx;
        	# proxy_temp_path xx;
        	# proxy_cache xx;
      }

      location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|unity3d)$ {
        	expires             1d;
      }

      location ~ .*\.(js|css)?$ {
        	expires             1d;
      }
}
```

##### 内置变量

- `$remote_addr` 客户端 ip
- `$remote_user` 客户端用户名
- `$time_local` 访问时区
- `$request` 请求的 URI 及 HTTP 版本
- `$status` 状态码
- `$body_bytes_sent` 发送给客户端的文件主体内容的大小
- `$http_referer` 请求 URL 地址
- `$http_user_agent` 客户端浏览器信息
- `$http_x_forwarded_for` 客户端 ip 地址列表(含中间代理)

## 用途

- web 服务器
- 正向代理(隐藏客户端信息)
- 反向代理(隐藏服务器信息)
- 负载均衡
- 动静分离(静态文件直接返回，动态文件交给其他服务器处理)

### 负载均衡

#### 轮询

```nginx
upstream myserver {
    server 192.168.1.101:8080;
    server 192.168.1.101:8081;
    server 192.168.1.101:8082;
}
server {
    listen      8070;
    server_name _;
    location / {
        proxy_pass http://myserver;
    }
}
```

#### 加权轮询

```nginx
upstream myserver {
    # 1 : 3 : 2
    server 192.168.1.101:8080;
    server 192.168.1.101:8081 weight=3;
    server 192.168.1.101:8082 weight=2;
}
```

#### ip_hash

- 将前端访问的 ip 进行 hash 操作后，然后根据 hash 的结果将请求分配到不同的节点上
- **保证每个 ip 都会访问固定的服务器节点**，无法区分内网机器

```nginx
upstream myserver {
    ip_hash;
    server 192.168.1.101:8080;
    server 192.168.1.101:8081 weight=3;
    server 192.168.1.101:8082 weight=2;
}
```

#### url_hash

- 将 url 地址进行 hash 操作，根据 hash 结果请求定向到同一服务器节点上
- **可以提高后端缓存服务器的效率**

```nginx
upstream myserver {
    hash $request_uri;
    server 192.168.1.101:8080;
    server 192.168.1.101:8081;
    server 192.168.1.101:8082;
}
```

#### fair

- fair 策略默认不被编译进 nginx 内核，**需要额外安装**
- 根据请求的**响应时间**判断节点负载，将请求转发到负载最小的节点上

```nginx
upstream myserver {
    fair;
    server 192.168.1.101:8080;
    server 192.168.1.101:8081;
    server 192.168.1.101:8082;
}
```

#### sticky

- sticky 策略默认不被编译进 nginx 内核，**需要额外安装**
- **基于 cookie 实现，可以区分内网机器(需要客户端启用 cookie)**

```nginx
upstream myserver {
    sticky name=sticky_cookie expires=6h;
    server 192.168.1.101:8080;
    server 192.168.1.101:8081;
    server 192.168.1.101:8082;
}
```

## 数值计算

- `Nginx` 能建立的最大连接数 `worker_processes * worker_connections`
- `HTTP` **请求本地资源**支持的最大并发数 `worker_processes * worker_connections`
- `HTTP` **作为反向代理**支持的最大并发数 `(worker_processes / 2) * worker_connections`

## more

- https://juejin.cn/post/6982340966946439199#heading-0
- https://juejin.cn/post/6861513798012895245#heading-0
- https://www.nginx.cn/doc/
