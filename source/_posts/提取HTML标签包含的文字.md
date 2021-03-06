---
title: 提取HTML标签包含的文字
date: 2020-12-23 14:28:43
tags:
	- HTML
	- 技巧
	- 正则表达式
categories: 正则表达式
top_img: /img/html.jpg
cover: /img/html.jpg
---

## 提取HTML标签包含的文字

```js
/**
 * 提取HTML标签包含的文字
 * @param {string} htmlText 包含 HTML 标签的字符串
 */
const tagReplace = function(htmlText) {
  let reg = /<\/?.+?\/?>/g
  return htmlText.replace(reg, '')
}
```