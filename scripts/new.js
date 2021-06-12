/*
 * @Author: zhangyang
 * @Date: 2020-12-18 09:34:44
 * @LastEditTime: 2021-06-12 17:35:22
 * @Description: 新建文章，自动使用 Typora 打开
 */
const spawn = require('child_process').exec;
hexo.on('new', (data) => {
  const isLinux = process.platform.includes('linux');
  if (isLinux) {
    spawn('typora ' + data.path);
  } else {
    spawn('start "D:/Program Files/Typora.exe" ' + data.path);
  }
});