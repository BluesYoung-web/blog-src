/*
 * @Author: zhangyang
 * @Date: 2020-12-18 09:34:44
 * @LastEditTime: 2020-12-18 09:37:33
 * @Description: 新建文章，自动使用 Typora 打开
 */
const spawn = require('child_process').exec;

hexo.on('new', (data) => spawn('start "D:/Program Files/Typora.exe" ' + data.path));