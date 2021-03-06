---
title: node版本问题
date: 2020-12-23 15:23:37
tags: nvm
categories: node
top_img: /img/node.jpg
cover: /img/node.jpg
---

## node 版本升级带来的兼容问题

- `node `版本升级之后可能会出现包不能正常使用的问题
- 使用 `nvm `可在同一台电脑之上同时安装不同版本的 `node `并根据实际需要启用不同的版本

## 安装 nvm

- [下载 nvm](https://github.com/coreybutler/nvm-windows/releases)
- **安装路径不能有中文或者空格**
- `nvm list`
- `nvm install version`
- `nvm use version`
- `nvm uninstall version`
- `nvm on`
- `nvm off`
- `nvm version`

## nvm 换源

- 修改安装目录下的 `settings.txt`

```yaml
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

