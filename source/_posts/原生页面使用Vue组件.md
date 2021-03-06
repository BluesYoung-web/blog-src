---
title: 原生页面使用Vue组件
categories: 遇到的问题及解决方案
date: 2021-01-07 10:55:15
tags:
	- Vue
	- 组件
	- 原生
top_img: /img/vue.jpg
cover: /img/vue.jpg
---

## 原生组件的写法

### 全局定义并注册

```js
;(function(Vue) {
	Vue.component('young', {
		props: {
			msg: String
		},
		template: `
			<div>
				<div class="taiji" @click="test">{{msg}}</div>
			</div>
		`,
		methods: {
			test() {
				alert(this.msg)
			}
		}
	})
})(window.Vue);
```

### 仅全局定义

```js
;(function(Vue) {
	window.Young = Vue.extend({
		name: 'Young',
		props: {
			msg: String
		},
		template: `
			<div>
				<div class="taiji" @click="test">{{msg}}</div>
			</div>
		`,
		methods: {
			test() {
				alert(this.msg)
			}
		}
	})
})(window.Vue);
```

## 潜在的问题

- 全局定义并注册的组件，引入之后就可以直接使用，例如 `element-ui`
- 仅全局定义的组件，引入之后会直接挂载到**window**上，需要**手动注册**