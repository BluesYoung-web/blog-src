---
title: 微信网页/SDK开发踩坑记
categories: 遇到的问题及解决方案
date: 2021-10-27 19:05:34
tags: ['微信SDK', 'JavaScript']
top_img: /img/wechat.jpeg
cover: /img/wechat.jpeg
---

## 微信授权 + 内置网页支付

### 获取授权

- 前置条件：
  - 微信公众平台 -> 公众号设置 -> 功能设置 -> 网页授权域名：
    - 下载对应的文件(`MP_verify_*.txt`)，放至域名根目录
    - 添加对应的域名：
      - 必须通过 ICP 备案验证
      - 外网可访问
      - 不得带端口号和协议
  - 支付相关：
    - 微信支付商户平台(`pay.weixin.qq.com`) -> 产品中心 -> 开发配置，一般配置之后 5 分钟生效
    - 设置支付授权目录为前端网页对应的 `url` (可以直接填写顶级域名)


```js
// 获取用户授权 code
/*
appid:                               微信公众号的 appid
redirect_uri:                   授权成功之后的回调地址，需要 encodeURIComponent
scope:                               snsapi_base 静默授权，只能获取 openid    |    snsapi_userinfo  获取用户基本信息，会弹出授权框
STATE:                               标志位，微信回调会原样返回，避免重复授权
*/
// 重定向到授权地址
location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&&state=${STATE}#wechat_redirect`
// 如果用户同意授权，页面将跳转至 redirect_uri/?code=CODE&state=STATE
```

### 授权流程

- 前端通过授权获取到 `CODE`，传递给后端

- 后端获取 `access_token`：

  - `https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code` 

```json
{
  "access_token":"ACCESS_TOKEN", // 授权接口凭证
  "expires_in":7200, // 凭证超时时间
  "refresh_token":"REFRESH_TOKEN", // 刷新凭证(自身有效期  30 天，https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN)
  "openid":"OPENID", // 用户唯一标识
  "scope":"SCOPE"  // 用户授权的作用域
}
```

- 后端获取用户信息(`snsapi_userinfo`)：

  - `https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN`

```json
{   
  "openid": "OPENID",
  "nickname": NICKNAME,
  "sex": 1,
  "province":"PROVINCE",
  "city":"CITY",
  "country":"COUNTRY", "headimgurl":"https://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
  "privilege":[ "PRIVILEGE1" "PRIVILEGE2"     ],
  "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
}
```

- 校验 `access_token` 有效性：

  - `https://api.weixin.qq.com/sns/auth?access_token=ACCESS_TOKEN&openid=OPENID`
  - `{ "errcode":0,"errmsg":"ok"}`
  - `{ "errcode":40003,"errmsg":"invalid openid"}`

### 支付流程

- [官方参考文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_1)

- 前端将用户的 `openid` 和 `unionid` 传递给后端

- 后端[调用统一下单接口接口生成订单](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1)，然后将返回的参数组合传递给前端

- 前端根据后端返回的参数，使用微信内置对象调起支付面板：

```js
// eslint-disable-next-line
WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
        "appId":"wx2421b1c4370ec43b",     //公众号ID，由商户传入     
        "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
        "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
        "package":"prepay_id=u802345jgfjsdfgsdg888",     
        "signType":"MD5",         //微信签名方式：     
        "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
    },
    (res) => {
        switch (res.err_msg) {
            case "get_brand_wcpay_request:ok": {
                alert("支付成功");
                ctx.$router.push({ path: '/wx/success' })
                break;
            }
            case "get_brand_wcpay_request:fail": {
                alert("支付失败，请重试");
                ctx.hasClicked = false;
                break;
            }
            case "get_brand_wcpay_request:cancel": {
                alert("已取消支付");
                ctx.hasClicked = false;
                break;
            }
            default: {
                alert(res.err_msg);
                ctx.hasClicked = false;
                break;
            }
        }
    }
);
```

  - **注意点：**

    - **前后端参数的不同——驼峰**
    - **时间戳必须为字符串，秒级，后端产生的时间戳**
    - **`package` 的值为 `prepay_id=*`**

## 微信内置网页调用 SDK 功能

### 前置条件

- 基本操作同上(**JS接口安全域名**)

- 引入微信 `sdk` `<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>` 

- 请求后端接口，获取权限验证相关的配置

- 后端通过 `access_token` 获取操作票据：

  - `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi`

```json
{
  "errcode":0,
  "errmsg":"ok",
  "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
  "expires_in":7200
}
```

- 根据票据生成签名返回相关参数给前端

- 前端进行权限验证：

```js
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});
```

  - **注意点：**

    - **后端生成签名的时候需要前端当前的 url 除了 hash 部分**
    - **前后端的域名必须一模一样**
    - **前端域名的查询参数必须合法**
    - **后端参数小写，前端参数驼峰**
