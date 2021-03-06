---
title: test
date: 2020-12-18 09:02:40
tags: 
  - JavaScript
  - test
categories: "测试"
hide: true
---

## 代码块

```js
const a = new Date();
```

![image-20201223100243147](../../themes/Butterfly/source/img/image-20201223100243147.png)

## 壁纸

<div class="gallery-group-main">
  {% galleryGroup '壁纸' '收藏的一些壁纸' '/Gallery/wallpaper'
  https://i.loli.net/2019/11/10/T7Mu8Aod3egmC4Q.png %} {% galleryGroup '漫威'
  '关于漫威的图片' '/Gallery/marvel'
  https://i.loli.net/2019/12/25/8t97aVlp4hgyBGu.jpg %} {% galleryGroup 'OH MY
  GIRL' '关于OH MY GIRL的图片' '/Gallery/ohmygirl'
  https://i.loli.net/2019/12/25/hOqbQ3BIwa6KWpo.jpg %}
</div>

![image-20201223100358858](../../themes/Butterfly/source/img/image-20201223100358858.png)



## note1

<div class="snote red"><p>默认red</p></div>
<div class="snote quote"><p>quote</p></div>
<div class="snote info"><p>info</p></div>
<div class="snote done"><p>done</p></div>
<div class="snote success"><p>success</p></div>
<div class="snote danger"><p>danger</p></div>
<div class="snote error"><p>error</p></div>
<div class="snote radiation"><p>radiation</p></div>
<div class="snote bug"><p>bug</p></div>
<div class="snote idea yellow"><p>idea-yellow</p></div>
<div class="snote link blue"><p>link- blue</p></div>
<div class="snote paperclip"><p>paperclip</p></div>
<div class="snote todo"><p>todo</p></div>
<div class="snote msg cyan"><p>msg cyan</p></div>
<div class="snote guide"><p>guide</p></div>
<div class="snote download"><p>download</p></div>
<div class="snote up"><p>up</p></div>
<div class="snote undo"><p>undo</p></div>

![image-20201223100452033](../../themes/Butterfly/source/img/image-20201223100452033.png)

## note2

{% note default icon %}
default
{% endnote %}

{% note primary icon %}
primary
{% endnote %}

{% note success icon %}
success
{% endnote %}

{% note info icon %}
info
{% endnote %}

{% note warning icon %}
warning
{% endnote %}

{% note danger icon %}
danger
{% endnote %}

{% note primary no-icon%}
#### Primary Header**Welcome** to [Hexo!](https://hexo.io)
{% endnote %}

![image-20201223100525032](../../themes/Butterfly/source/img/image-20201223100525032.png)

## note3

<div class='tip' ><p>默认情况<p></div>
<div class='tip success'><p>success<p></div>
<div class='tip error'><p>error<p></div>
<div class='tip warning'><p>warning<p></div>

![image-20201223100555195](../../themes/Butterfly/source/img/image-20201223100555195.png)

## note4

<p class='div-border green'>绿色</p>
<p class='div-border red'>红色</p>
<p class='div-border yellow'>黄色</p>
<p class='div-border grey'>灰色</p>
<p class='div-border blue'>蓝色</p>

![image-20201223100636610](../../themes/Butterfly/source/img/image-20201223100636610.png)

## tag

<span class="inline-tag red">红色小标签</span>
<span class="inline-tag green">绿色小标签</span>
<span class="inline-tag blue">蓝色小标签</span>
<span class="inline-tag yellow">黄色小标签</span>
<span class="inline-tag grey">灰色小标签</span>

![image-20201223100704963](../../themes/Butterfly/source/img/image-20201223100704963.png)

## 引用

<div class="snote quote">
  <p class='p subtitle'>小标题</p>
  这是个引用
</div>

![image-20201223100729927](../../themes/Butterfly/source/img/image-20201223100729927.png)

## 折叠内容

{% hideToggle 我是拥有折叠内容的标签 %}
 来了老弟
{% endhideToggle %}

![image-20201223100757919](../../themes/Butterfly/source/img/image-20201223100757919.png)

## 图形

{% mermaid %}
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
{% endmermaid %}

![image-20201223100820495](../../themes/Butterfly/source/img/image-20201223100820495.png)

## tab

- 预设选择 3

{% tabs test2, 2 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}

![image-20201223100850850](../../themes/Butterfly/source/img/image-20201223100850850.png)

## tab + icon

{% tabs test4 %}
<!-- tab 第一个Tab -->
**tab名字为第一个Tab**
<!-- endtab -->

<!-- tab @fab fa-apple-pay -->
**只有图标 没有Tab名字**
<!-- endtab -->

<!-- tab 炸弹@fas fa-bomb -->
**名字+icon**
<!-- endtab -->
{% endtabs %}

![image-20201223100911411](../../themes/Butterfly/source/img/image-20201223100911411.png)

## 按钮

```
{% btn [url],[text],[icon],[color] [style] [layout] [position] [size] %}

[url]         : 链接
[text]        : 按钮文字
[icon]        : [可选] 图标
[color]       : [可选] 按钮背景顔色(默认style时）
                      按钮字体和边框顔色(outline时)
                      default/blue/pink/red/purple/orange/green
[style]       : [可选] 按钮样式 默认实心
                      outline/留空
[layout]      : [可选] 按钮佈局 默认为line
                      block/留空
[position]    : [可选] 按钮位置 前提是设置了layout为block 默认为左边
                      center/right/留空
[size]        : [可选] 按钮大小
                      larger/留空
```

This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}

{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block center larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block right outline larger %}

![image-20201223100937927](../../themes/Butterfly/source/img/image-20201223100937927.png)

## 多彩按钮

{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,blue larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,pink larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,red larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,purple larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,orange larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,green larger %}

![image-20201223101007812](../../themes/Butterfly/source/img/image-20201223101007812.png)

## 多彩边框按钮

<div class="btn-center">
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline blue larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline pink larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline red larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline purple larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline orange larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline green larger %}
</div>

![image-20201223101028900](../../themes/Butterfly/source/img/image-20201223101028900.png)

## 时间线

<div id="archive">
  <div class="article-sort-title">我是标题</div>
  <div class="article-sort">
    <div class="article-sort-item year">2020</div>
  </div>
</div>