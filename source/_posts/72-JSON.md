---
title: 72-JSON
top_img: /img/hbs.png
cover: /img/hbs.png
categories:
  - 学习笔记
  - JavaScript高级程序设计
  - 第23章——JSON
tags:
  - JavaScript高级程序设计第四版
  - JavaScript
date: 2021-02-03 15:45:34
---

## 语法

- 简单值
  - 支持字符串、数值、布尔值以及`null`
  - 不支持`undefined`
- 对象
  - 键值对恶意代码
  - 键值可为任意类型
- 数组
  - 有序值的列表
  - 可通过数组索引访问
  - 值可以是任意类型
- 属性名和属性值都必须加双引号

## 解析

- 早期使用 `eval()`，可能执行恶意代码，已废弃
- `JSON.parse()` 解析
- `JSON.stringify()` 序列化

### `JSON.stringfy(obj, filter, char)`

- 如果对象有`toJSON`方法则直接调用
- `obj`  要序列化的对象
- `filter`  属性过滤器，可以是数组，也可以是函数
- `char`  数字代表缩进空格数，字符代表填充字符；都不超过10个

```js
var book = {
    title: 'The Red Book',
    authors: [
        "张三丰", 
        "张无忌"
    ],
    edition: 3,
    year: 2020
}

var str1 = JSON.stringify(book, ['authors', 'year']);
var str2 = JSON.stringify(book, (key, value) => {
    switch(key){
        case 'authors':
            return value.join(',');
        case 'edition':
            return 666;
        default:
            return value;
    }
});
console.log(str1);
console.log(str2);
```

### `JSON.parse(str, rev)`

- `str` 要还原的对象
- `rev` 对应每一项的处理函数

```js
let book = {
   title: "Professional JavaScript",
   authors: ["Nicholas C. Zakas", "Matt Frisbie"],
   edition: 4,
   year: 2017,
   releaseDate: new Date(2017, 11, 1)
};
let jsonText = JSON.stringify(book);
let bookCopy = JSON.parse(jsonText, (key, value) => key == "releaseDate" ? new Date(value) : value);
alert(bookCopy.releaseDate.getFullYear()); 
```

### `toJSON` 属性

- 序列化函数
- 返回值对应 `JSON.stringify()` 的结果