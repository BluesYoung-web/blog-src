---
title: typeorm踩坑计02
categories: 遇到的问题及解决方案
date: 2021-07-02 17:00:11
tags: [Node, TypeORM]
top_img: /img/node.jpg
cover: /img/node.jpg
---

## 分页

- 官方文档推荐的 `skip` 和 `take` 卵用没有
- 还是要用 `offset` 和 `limit`
- 而且 **必须先写 offset 再写 limit**，否则会报错

## `COUNT` 查询的同时计数

- 单列计数是没问题的
- **一旦超过单列，得到的数值就会出错**
- 大于单列的需要单独查询计数

## SQL 防注入(转义)

- `.where("user.name = :name", { name: "Timber" })`
- 一点用都没有，注入进去的值都变成了`?`，不如直接使用**模板字符串**

## Repository

- 直观便于理解，但是性能略差

```js
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
async function fn() {
  const userRepo = getRepository(User);
  // 查询单个
  const user = await userRepo.findOne({
    where: { uid: 66666 }
  });
  // 查询所有
  const users = await userRepo.find();
  // 计数
  const num = await userRepo.count();
  // 新增 | 修改
  const n_user = new User();
  n_user.nick = '胡歌';
  await userRepo.save(n_user);
  // 删除
  await userRepo.remove(user);
}
```

## QueryBuilder

- 性能最好，功能强大
- 不容易理解

```js
import { getRepository, getConnection } from 'typeorm';
import { User } from '../entity/User';
async function fn() {
  const userRepo = getRepository(User);
  const page = 1;
  const limit = 10;
  // 查询
  const user = await userRepo.createQueryBuilder('user')
  	// 左联，不论是否有值都会返回
  	.leftJoinAndSelect('user.metadata', 'meta')
  	// 内联，只有有值才会返回
  	.innerJoinAndSelect('user.circles', 'circle')
  	.select('user.uid', 'uid')
  	.addSelect('meta.nick', 'nick')
  	.offset((page - 1) * limit)
  	.limit(limit)
  	.groupBy('circle.autoid')
  	.addOrderBy('circle.time', 'DESC')
	  .where(`user.uid = ${666}`)
  	.andWhere(`circle.content = '${'啦啦啦'}'`)
  	.getRawMany();
 	// 插入
  await getConnection()
  	.createQueryBuilder()
  	.insert()
  	.into(Circle)
  	.values({
  		content: 'djkhfl',
    	img_url: '/img/***.png',
	    user_id: 1
	  })
  	.execute();
  // 修改
  await getConnection()
  	.createQueryBuilder()
  	.update(Circle)
  	.set({ content: 'hello world' })
  	.where(`autoid = ${1}`)
  	.execute();
  // 删除
  await getConnection()
  	.createQueryBuilder()
  	.delete()
  	.from(Circle)
  	.where(`autoid = ${1}`)
  	.execute();
}
```

## 事务

- 同时执行一批任务，只要有任何一个失败都会被回滚

```js
import { getConnection } from 'typeorm';

async function fn() {
  // 获取连接
  const connection = getConnection();
  // 创建新的 queryrunner 
  const queryRunner = connection.createQueryRunner();
  // 建立新的数据库连接
  await queryRunner.connect();

  // 开始事务
  await queryRunner.startTransaction();
  try {
    await queryRunner.manager.createQueryBuilder()
      // do sth1
    await queryRunner.manager.createQueryBuilder()
      // do sth2
    await queryRunner.manager.createQueryBuilder()
      // do sth3
    
    // 全部执行成功，提交事务
    await queryRunner.commitTransaction();
		// 释放数据库连接
    await queryRunner.release();
  } catch(e) {
    console.error(e);
    // 事务失败，回滚
    await queryRunner.rollbackTransaction();
    // 释放数据库连接
    await queryRunner.release();
  }
}
```

