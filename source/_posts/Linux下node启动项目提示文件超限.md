---
title: Linux下node启动项目提示文件超限
categories: 遇到的问题及解决方案
date: 2021-07-29 19:16:31
tags: [Linux, Node]
top_img: /img/shumeipai.jpg
cover: /img/shumeipai_cover.jpg
---

## Linux 下使用 Node 启动项目提示文件超限的错误

### 报错代码

```
Error: ENOSPC: System limit for number of file watchers reached, watch '******'
		at FSWatcher.start
```

### 解决方案

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
sudo sysctl --system
```

