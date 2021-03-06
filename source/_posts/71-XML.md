---
title: 71-XML
top_img: /img/hbs.png
cover: /img/hbs.png
categories:
  - 学习笔记
  - 红宝书
  - 第22章——XML
tags:
  - 红宝书第四版
  - JavaScript
date: 2021-02-03 15:22:34
---

## 创建 `XML` 文档

```js
// 检查浏览器是否支持 DOM Level 2 XML
let hasXmlDom = document.implementation.hasFeature("XML", "2.0"); 

let xmldom = document.implementation.createDocument("", "root", null);
console.log(xmldom.documentElement.tagName); // "root"
let child = xmldom.createElement("child");
xmldom.documentElement.appendChild(child); 
```

## 解析 `XML`

```js
let parser = new DOMParser();
let xmldom = parser.parseFromString("<root><child/></root>", "text/xml");
console.log(xmldom.documentElement.tagName); // "root"
console.log(xmldom.documentElement.firstChild.tagName); // "child"
let anotherChild = xmldom.createElement("child");
xmldom.documentElement.appendChild(anotherChild);
let children = xmldom.getElementsByTagName("child");
console.log(children.length); // 2 
```

## `XML` 序列化

```js
let serializer = new XMLSerializer();
let xml = serializer.serializeToString(xmldom);
console.log(xml); 
```

## 对 `XPath` 的支持

- ...

## 对 `XSLT` 的支持

- ...