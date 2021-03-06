---
title: 转义之后的Unicode字符串
date: 2020-12-23 13:59:18
tags:
    - 字符串处理
    - 技巧
categories: 遇到的问题及解决方案
---

## 从后端返回的字符串被转义了

- `\u5929\u771F\u721B\u6F2B\u9AD8\u895F\u59EB`乍看之下并没有什么特别的地方
- 但是实际的内容是`\\u5929\\u771F\\u721B\\u6F2B\\u9AD8\\u895F\\u59EB`
- 所以各种字符串解密的方法都无法**直接**将其恢复为正常的字符串

```js
let str = '\\u5929\\u771F\\u721B\\u6F2B\\u9AD8\\u895F\\u59EB';
function decodeTransferredString(str){
    str = JSON.stringify(str).split('\\');
    // 将字符串根据 \\ 分割
    // [""", "", "u5929", "", "u771F", "", "u721B", "", "u6F2B", "", "u9AD8", "", "u895F", "", "u59EB""]
    str = str.filter((item) => item.match(/u/));
    // 筛选出包含 u 的
    // ["u5929", "u771F", "u721B", "u6F2B", "u9AD8", "u895F", "u59EB""]
    str = str.map((item) => item.replace('u', '0x'));
    // 将 u 替换为 0x
    // ["0x5929", "0x771F", "0x721B", "0x6F2B", "0x9AD8", "0x895F", "0x59EB""]
    str[str.length-1]=str[str.length-1].slice(0,str[str.length-1].length-1);
    // 切割最后一个元素多余的字符串
    // ["0x5929", "0x771F", "0x721B", "0x6F2B", "0x9AD8", "0x895F", "0x59EB"]
    str = str.map((item) => parseInt(item));
    // 将十六进制转换为十进制，不要这一步也可以
    return String.fromCharCode(...str)
    // 将其恢复为字符串
}
```