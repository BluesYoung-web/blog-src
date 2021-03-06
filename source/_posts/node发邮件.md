---
title: node发邮件
categories: node
date: 2020-12-23 17:06:25
tags:
	- node
  - 技巧
top_img: /img/node.jpg
cover: /img/node.jpg
---

```javascript

const nodeMailer = require('nodemailer');

async function sendMail() {
  const transpoter = nodeMailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false,
    auth: {
      user: '用户名',
      pass: '秘钥，从邮箱服务商获取'
    }
  });
  
  const info = await transpoter.sendMail({
    from: `"来了老弟" <132456789@qq.com>`,
    to: `111222333@163.com`,
    subject: `好嗨哟`,
    text: '来了老弟、好嗨哟',
    html: '<h1>来了老弟好嗨哟</h1>'
  });

  console.log('邮件发送成功：' + info.messageId);
  console.log('预览地址：' + nodeMailer.getTestMessageUrl(info));
}

sendMail().catch((err) => {
  console.log('err: ' + err);
});
```

