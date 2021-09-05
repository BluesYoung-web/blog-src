---
title: wsl的安装及美化
top_img: /img/skill.jpg
cover: /img/skill.jpg
categories: 奇技淫巧
tags:
  - 奇技淫巧
date: 2021-09-05 15:55:46
---

## 安装

- [win10](https://zhuanlan.zhihu.com/p/199672708)

```bash
# 使用管理员身份打开 powershell
# 获取有效的分发列表
wsl --list --online
# 安装(默认为 Ubuntu)
wsl --install
```

## 美化

```bash
# 打开安装好的 Ubuntu
wsl
# 安装 zsh
sudo apt-get install zsh
# 安装 oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# 修改配置文件，切换主题
nano ~/.zshrc
# 使用 omz 命令切换主体和更新(推荐)
# 查看本地所有主题
omz theme list
# 临时使用某个主题
omz theme use theme-name
# 将某个主题设置为默认主题
omz theme set theme-name
# 更新
omz update

# 下载 powerlevel10k 主题
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
# 启用
omz theme set powerlevel10k/powerlevel10k
```

## 实用第三方插件安装

```bash
# 根据历史记录自动补全插件
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# 修改颜色
nano ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
# ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=cyan'

# zsh 指令语法高亮插件
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 启用插件
omz plugin enable plugin-name
```

## 可能出现的问题

### 命令行中文乱码

- 下载并安装对应的[字体](https://github.com/romkatv/powerlevel10k#manual-font-installation)
- 在使用的地方使用 `MesloLGS NF` 字体

### GUI 应用中文乱码

```bash
sudo apt-get install fonts-noto-cjk
```

