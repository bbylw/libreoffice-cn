# LibreOffice 中文站

一个以 **TanStack Start + Bun** 构建的中文内容站，介绍 LibreOffice 26.8.1：下载入口、六款应用、代码结构速览与社区参与方式。

内容依据 [libreoffice.org](https://www.libreoffice.org/)、[下载页](https://www.libreoffice.org/download/download-libreoffice/) 与
[LibreOffice/core README](https://github.com/LibreOffice/core) 整理，下载链接指向 The Document Foundation 官方镜像。

## 技术栈

| 关注点 | 选型 | 版本 |
| --- | --- | --- |
| 框架 | TanStack Start（全栈 React，文件式路由 + SSR） | 1.169.2 |
| 路由 | TanStack Router（代码分割、预加载、滚动恢复） | 1.170.44 |
| 打包 | Vite + Rolldown + nitro 预设 | 8.3.4 |
| 样式 | Tailwind CSS v4（`@theme inline` CSS 变量主题） | 4.3.3 |
| 动效 | Motion（Framer Motion 的继任者） | 14.2.0 |
| 图标 | Phosphor Icons | 2.1.10 |
| 字体 | 自托管 Fontsource 变量字体（Outfit / Noto Sans SC / JetBrains Mono） | 5.3.x |
| 运行时与包管理 | Bun | 1.4.3 |

## 运行

```bash
bun install
bun dev        # http://127.0.0.1:5178
bun run build  # 产出 .output/，并跑一次 tsc --noEmit
bun start      # 以 bun 运行生产构建的 nitro 服务
```

`vite.config.ts` 里显式绑定了 `127.0.0.1:5178`（本机 3000 端口被占用）。改端口直接编辑该文件即可。
生产服务端口通过环境变量覆盖：`$env:PORT="5180"; bun start`。

## 路由

| 路径 | 说明 |
| --- | --- |
| `/` | 首页：首屏、六款应用、选择理由、26.8 新特性、下载条、代码结构、社区与评价 |
| `/download` | 下载矩阵（版本 / 系统 / 架构 / 包类型）、运行与构建要求、其他获取方式 |
| `/develop` | 两条开发路径、关键模块、`#include` 规则、求助渠道 |
| `/community` | 入门面谈、七个贡献方向、社区活动、官方账号 |
| 未匹配 | 中文 404 页 |

## 目录

```
src/
  components/      页头、页脚、主题切换、下载矩阵、入场动效、404 与错误边界
  data/            纯数据：版本矩阵、六款应用、模块说明、系统要求、社区信息
  routes/          文件式路由，每个路由自带 head()（标题、描述、OG）
  styles/app.css   设计令牌（颜色、字体、圆角）、深浅主题、基础样式
  router.tsx       路由器装配
public/media/      站点使用的真实素材（应用截图、插图、社区照片、社交图标）
```

## 设计约定

- **单一强调色**：取自品牌绿 `#18a303`。图形用原色，文字与按钮用加深版 `#0e6a02`（对比度 6.7:1，满足 WCAG AA）。
- **形状系统**：卡片 16px、控件 10px，仅版本徽标使用胶囊形。
- **深浅主题**：`<html data-theme>` 驱动，内联脚本在首帧前决定主题，避免闪烁；切换结果写入 localStorage。
- **动效**：只动 `transform` 与 `opacity`，全部通过 `useReducedMotion()` 尊重 `prefers-reduced-motion`。
- **文案**：全站零破折号；中文标点统一使用全角。

## 数据来源

- 下载地址按官方镜像目录规则生成：`https://download.documentfoundation.org/libreoffice/stable/<版本>/<平台>/<架构>/<文件名>`，同时给出 `.torrent` 与 `.mirrorlist`。版本号取自官方下载页当前的 26.8.1（稳定版）与 26.2.6（维护版）。
- 系统要求取自 LibreOffice/core README 的「构建链与运行时基线」。
- 模块说明取自同一份 README 的「代码中的关键部分」。
- 截图与插图来自 libreoffice.org 官方媒体目录（CC BY-SA 3.0）。

## 许可

本站为中文整理站点，非 LibreOffice 官方站点。内容采用知识共享 署名相同方式共享 3.0
许可；LibreOffice 源代码以 Mozilla 公共许可证 2.0 授权。「LibreOffice」与「The Document
Foundation」是其各自所有者的注册商标。
