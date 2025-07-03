# Matrica Design Icons

一款基于 [Material Design Icons](https://pictogrammers.com/library/mdi/) 设计的适用于 Minecraft 的 16x 像素图标资产库。


## 版本说明

- **Material Design Icons** —— 为普通玩家提供的资源包。
- **Material Design Icons DEV** —— 为开发者提供的资源包，随附一个网页以供查询图标，您必须解压此压缩包才能使用网页。


## 原理与使用方法

从 Minecraft Java 版 1.16 快照 20w17a 开始，文本组件支持指定字体，这使得创作一个图标资产库并制作成一个易用的资源包变得更加便捷。

本图标库利用了 Unicode 基本平面的私用区来填充图标，在安装资源包后，您可以轻松地在 Minecraft 中使用它：

``` text
/tellraw @a [{"text":"\ue000","font":"matrica:player"},{"text":"Hello, world!","font":"minecraft:default"}]
```

您可以访问本项目的[在线网页](https://sheep-realms.github.io/Matrica-Design-Icons/)或在浏览器中打开资源包随附的 `index.html` 文件即可浏览所有可用图标。


## 构建方法

1. Fork 此仓库，或者别的什么能让您执行工作流的方法。
2. 前往仓库的 Actions 页面，手动执行 Matrica Design Icons Build（build.yml）工作流。
3. 等待工作流执行完毕，在工作流详情里的 Artifacts 中下载产物。


## 主要结构

``` text
assets/ - 资源包资产文件
web/ - 图标查询工具资产
├ assets/ - 美术资产
├ lang/ - 本地化
├ lib/ - 前置库
└ res/ - 网页核心资产
  ├ class/ - 类
  ├ data/ - 注册表
  │ ├ auto_tag.js - 自动标签
  │ ├ icon.js - 前端图标
  │ ├ root.js - 根注册表
  │ └ texture_set.js - 图标纹理图集
  ├ script/ - 脚本
  └ style/ - 样式表
app.js - 图标查询工具版本元数据
pack-dev.png - 资源包图标（DEV）
pack.mcmeta - 资源包元数据
pack.png - 资源包图标
```


## 另见

- [授权协议与声明](copyright.md)