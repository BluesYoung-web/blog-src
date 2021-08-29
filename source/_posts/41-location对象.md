---
title: 41-location对象
top_img: /img/hbs.png
cover: /img/hbs.png
categories:
  - 学习笔记
  - JavaScript高级程序设计
  - 第12章——BOM
tags:
  - JavaScript高级程序设计第四版
  - JavaScript
date: 2021-01-20 08:37:33
---

## 定义

- 提供了当前窗口中加载文档的信息，以及通常的导航功能
- `location === window.location === document.location`

## 属性

- `http://user:pass@www.abc.com:80/admin/?q=young#target`

| 属性                | 值                                                      | 说明                                             |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------ |
| `location.hash`     | `#target`                                               | `URL` 的哈希地址(包含`#`)                        |
| `location.host`     | `www.abc.com:80`                                        | 服务器主机名及端口号                             |
| `location.hostname` | `www.abc.com`                                           | 服务器主机名                                     |
| `location.href`     | `http://user:pass@www.abc.com:80/admin/?q=young#target` | 页面完整的 `URL`，`location.toString()` 的返回值 |
| `location.pathname` | `/admin/`                                               | 路径名                                           |
| `location.port`     | `80`                                                    | 端口号，默认80(`https-443`)                      |
| `location.protocol` | `http:`                                                 | 协议名                                           |
| `location.search`   | `?q=young`                                              | 查询字符串                                       |
| `location.username` | `user`                                                  | 用户名                                           |
| `location.password` | `pass`                                                  | 密码                                             |
| `location.origin`   | `http://www.abc.com`                                    | 源地址，**只读**                                 |

### `URL`

- 将普通的字符串转换为对象，拥有 `location` 对象的属性
- **new URL().searchParams 为 URLSearchParams 实例**

```js
new URL("https://developer.mozilla.org/en-US/docs/Web/API/URL_API")
```

## 查询字符串

### 原始解析

```js
function queryParse(sq = location.search) {
  const qs = (sq.length > 0 ? sq.substring(1) : '');
  const map = new Map();
  for(const [key, value] of qs.split('&').map((kv) => kv.split('='))){
    const k = decodeURIComponent(key);
    const v = decodeURIComponent(value);
    k && map.set(k, v);
  }
  return map;
}
```

### `URLSearchParams`

```js
function queryParse(sq = location.search) {
  return new Map(new URLSearchParams(sq));
}
```

#### 构造函数

- 自带 `encodeURIComponent` 编码效果

```js
new URLSearchParams('?tn=60017574_oem_dg&ie=utf-8&wd=%E6%9D%A5%E5%88%B8');
new URLSearchParams([["foo", 1],["bar", 2]]);
new URLSearchParams({"foo" : 1 , "bar" : 2});
```

#### 实例方法

| 方法                            | 说明                                         |
| ------------------------------- | -------------------------------------------- |
| `has(key)`                      | 是否拥有查询字段`key`                        |
| `get(key)`                      | 获取对应的值，没有则返回`null`               |
| `getAll(key)`                   | 获取对应的所有值组成的数组，没有则返回空数组 |
| `set(key, value)`               | 设置对应的键值对                             |
| `append(key, value)`            | 添加对应的键值对                             |
| `delete(key)`                   | 删除对应的键值对                             |
| `keys()`                        | 返回所有键名组成的数组                       |
| `values()`                      | 返回所有值组成的数组                         |
| `entries()`                     | 返回所有键值对组成的二维数组                 |
| `forEach(value, key, instance)` | 遍历                                         |
| `sort()`                        | 排序                                         |
| `toString()`                    | 返回查询字符串，不包含`?`                    |

### 修改地址

- `location.assign("http://www.wrox.com")`，立即导航到新的 `URL`，同时在浏览器历史记录中增加一条记录
- 修改除`hash`之外的属性，会立即重新加载新的`URL`
- `location.replace(url)`，重新加载后不会增加历史记录，用户**不能回到前一页**
- `location.reload(force = false)`，重新加载当前页面