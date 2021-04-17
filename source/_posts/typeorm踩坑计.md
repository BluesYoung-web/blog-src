---
title: typeorm踩坑计
categories: 遇到的问题及解决方案
date: 2021-04-08 16:14:09
tags: [Node, TypeORM]
top_img: /img/node.jpg
cover: /img/node.jpg
---

## 使用 ORM 的好处

- **防止 SQL 注入**
- 动态构造查询条件
- 不用手动建表
- ...

## 配置之坑

### 从示例代码里面 copy 过来的

- ts 直接运行正常

```json
"entities": [
  "src/entity/**/*.ts"
],
"migrations": [
  "src/migration/**/*.ts"
],
"subscribers": [
  "src/subscriber/**/*.ts"
]
```

- 编译为 js 运行之后就是

```bash
RepositoryNotFoundError: No repository for "User" was found. Looks like this...
```

### 修改之后的

- **逗号后面不能有空格，否则不生效**

```json
"entities": [
  "src/entity/**/*{.ts,.js}"
],
"migrations": [
  "src/migration/**/*{.ts,.js}"
],
"subscribers": [
  "src/subscriber/**/*{.ts,.js}"
]
```

## 莫名其妙的错误

- 本质上好像是实体路径引入的问题

```bash
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'; ^ SyntaxEr...
```

### 解决

- 删掉默认的配置，将配置写入 ts 文件作为模块暴露
- 实体路径书写的时候使用 `resolve(__dirname, 'src/**/*{.ts,.js})` 进行拼接

```typescript
import { resolve } from 'path';

export default {
  CONF_HTTP_PORT: 1443,
  CONF_WS_PORT: 9527,
  CONF_ORM: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'orm_chat_demo',
    synchronize: true,
    logging: false,
    entities: [resolve(__dirname, 'src/entity/**/*{.ts,.js}')],
    migrations: [resolve(__dirname, 'src/migration/**/*{.ts,.js}')],
    subscribers: [resolve(__dirname, 'src/subscriber/**/*{.ts,.js}')]
 }
}
```

## 动态批量导入路由及配置相应的 Controller

- **创建 app 实例的方法，必须在数据库连接成功之后使用 require 动态导入**
- 动态导入路由配置的时候，需要**先添加可选链**，然后再进行遍历

```typescript
// login.ts
import { Young_Route_Item } from '../@types/my-routes';
import { LoginController } from './../controller/LoginController';

export const prefix = '/login';
export const router: Young_Route_Item[] = [
  { method: 'get', path: '/', controller: LoginController, action: 'notApply' },
  { method: 'post', path: '/', controller: LoginController, action: 'post' },
];
```

```typescript
// index.ts
import KoaRouter from '@koa/router';
import { Context } from 'koa';
import { readdirSync } from 'fs';
import { Young_Route_Item } from './../@types/my-routes.d';
import combineRouters from 'koa-combine-routers';

const router  = new KoaRouter();

router.get('/', async (ctx: Context) => {
  ctx.body = '来了老弟'
});

let allRoutes = [router];

readdirSync(__dirname)
  .filter((f) => f !== 'index.ts')
  .map((f) => require('./' + f))
  ?.forEach(({ prefix = '/', router: youngRoutes } : { prefix: string, router: Young_Route_Item[] }) => {
    const temp_router = new KoaRouter();
    temp_router.prefix(prefix);
    youngRoutes?.forEach(({ method, path, controller: Controller, action }) => {
      // 必须使用异步函数的写法，否则会返回 404
      temp_router[method](path, async (ctx: Context) => {
        await (new Controller())[action](ctx);
      });
    });

    allRoutes.push(temp_router);
  });

export default combineRouters(...allRoutes);
```

```typescript
// http 服务器启动配置
import Koa from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-bodyparser';
import helmet from 'koa-helmet';
import staticFile from 'koa-static';
import path from 'path';
import router from './routers';

import logger from './middleware/logger';

export const createApp = () => {
  const app = new Koa();
  // 数据解析
  app.use(koaBody());
  // 处理跨域
  app.use(cors());
  // 加入安全的响应头信息
  app.use(helmet());
  // 记录日志
  app.use(logger());
  // 静态文件托管
  app.use(staticFile(path.join(__dirname, '../public')));

  app.use(router());
  app.listen(1443, () => {
    console.log('服务器运行中......');
    console.log('http://localhost:1443');
  });
}


export default createApp;
```

```typescript
// 项目入口文件
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import conf from './conf';

(async () => {
  // 引入数据库配置
  const orm_conf = conf.CONF_ORM;
  // 连接数据库，如果没有表则建表
  // 一定要加 catch ！！！
  await createConnection(orm_conf as any).catch((error) => console.error(error));
  // 必须在数据库连接建立成功之后动态导入
  const { createApp } = await require('./src/server');
  createApp();
})();
```