# Matrica Design Icons

一款基于 [Material Design Icons](https://pictogrammers.com/library/mdi/) 设计的适用于 Minecraft 的 16x 像素图标资产库。


## 版本说明

- **Material Design Icons** —— 为普通玩家提供的资源包。
- **Material Design Icons DEV** —— 为开发者提供的资源包，随附一个网页以供查询图标，您必须解压此压缩包才能使用网页。


## 原理与使用方法

从 Minecraft Java 版 1.16 快照 20w17a 开始，文本组件支持指定字体，这使得创作一个图标资产库并制作成一个易用的资源包变得更加便捷。

本图标库利用了 Unicode 基本平面的私用区来填充图标，在安装资源包后，您可以轻松地在 Minecraft 中使用它：

``` text
/tellrow @a [{"text":"\ue000","font":"matrica:player"},{"text":"Hello, world!","font":"minecraft:default"}]
```

您可以访问本项目的[在线网页](https://sheep-realms.github.io/Matrica-Design-Icons/)或在浏览器中打开资源包随附的 `index.html` 文件即可浏览所有可用图标。