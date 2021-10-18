---
title: 个人开源项目
date: 2020-12-20 15:11:48
toc: true
toc_number: true
---

## 后台管理系统

- [仓库地址](https://gitee.com/BluesYoung-web/admin-vue3-element3-vite2)
- [在线预览(真实请求，后端为树莓派内网穿透，可能不在线)](http://frp.104300.xyz:15151/)
- [在线预览(基于Mock，无真实请求)](https://bluesyoung-web.gitee.io/admin-vue3-element3-vite2/#/)

- `vue3 + TypeScript + Vite2 + ElementPlus`
- 继承自`tailwindcss` 的 `windicss` ，**零配置 `css` 自动摇树优化**

- 基于[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 的方法自动按需导入
- 基于[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 的组件自动按需导入
- 基于[unplugin-icons](https://github.com/antfu/unplugin-icons) 的图标自动按需导入
- **拥有自动创建页面的 node 脚本，实现页面创建及路由注册自动化**
- 二次封装常用组件

## 后台管理系统配套的后端程序

- `koa2 + typeorm + mysql + redis`
- [仓库地址](https://gitee.com/BluesYoung-web/admin-server)

-  HTTP 服务器
-  WebSocket 服务器
-  动态路由及控制器
-  基于节点的权限控制
-  10分钟无数据库相关操作，token自动失效

## 社交聊天 APP

- [仓库地址](https://gitee.com/BluesYoung-web/young-chat)
- [在线预览(真实请求，后端为树莓派内网穿透，可能不在线)](http://frp.104300.xyz:15151/chat/#/pages/login/index)
- `uni-app + uview`
-  通过 websocket 上传文件
-  动态(朋友圈)
-  通讯录(好友机制)
-  单聊、群聊

![登录](/img/登录.png)
![登录](/img/我的.png)
![登录](/img/好友申请.png)
![登录](/img/好友列表.png)
![登录](/img/消息列表.png)
![登录](/img/聊天.png)


## 社交聊天 APP 配套后端程序

- [仓库地址](https://gitee.com/BluesYoung-web/young-chat-server)
-  HTTP 服务器
-  WebSocket 服务器
-  动态路由及控制器
-  post 登录返回 token
-  svg 验证码
-  连接 websocket 进行 token 校验，成功继续，失败直接断开
-  通过 websocket 上传图片/音频
-  用户模块(登录，修改个人信息)
-  动态模块(发表动态|删除动态、点赞|取消点赞、评论|回复评论|删除评论)
-  好友模块(搜索、发送好友申请、处理好友申请、删除好友)
-  聊天室模块(单聊、群聊，发送文本、图片、音频)
