---
title: git删除远程仓库的提交
top_img: /img/skill.jpg
cover: /img/skill.jpg
categories: 奇技淫巧
tags:
  - 奇技淫巧
date: 2021-08-16 15:52:02
---

## git删除远程仓库的提交

```bash
# 本地回退到上一个版本
git reset --hard HEAD~1
# 强制推送到远程服务器
git push -f
```

## 误删恢复

```bash
# 展示所有提交过但是如今不存在的版本的 hash
git fsck --lost-found 
# 查看提交的内容
git show hash码前6位
# 恢复被删除的版本
git reset --hard hash码前6位
```

