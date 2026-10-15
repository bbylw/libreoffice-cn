# LibreOffice
[![Coverity 扫描构建状态](https://scan.coverity.com/projects/211/badge.svg)](https://scan.coverity.com/projects/211) [![OpenSSF 最佳实践](https://www.bestpractices.dev/projects/307/badge)](https://www.bestpractices.dev/projects/307) [![翻译状态](https://weblate.documentfoundation.org/widgets/libo_ui-master/-/svg-badge.svg)](https://weblate.documentfoundation.org/engage/libo_ui-master/?utm_source=widget)

<img align="right" width="150" src="https://opensource.org/wp-content/uploads/2009/06/OSIApproved.svg">

LibreOffice 是一套基于 copyleft（著佐权）许可证的集成办公套件，
兼容绝大多数文档格式与标准。LibreOffice 由
The Document Foundation（文档基金会）背书，该基金会代表着一个庞大的
独立社区，由企业、开发者及其他志愿者组成，大家怀着共同的目标——
把最好的个人生产力软件推向市场。LibreOffice 是开源软件，可自由地
下载、使用与分发。

LibreOffice 代码结构速览。

## 概述

你可以通过两种方式之一来为 LibreOffice 做开发，其中一种被推荐，
另一种则不太推荐。先说那个相对不太推荐的方式：你可以使用 SDK 来
开发一个扩展（extension），为此你可以阅读
[API 文档](https://api.libreoffice.org/)以及
[开发者指南](https://wiki.documentfoundation.org/Documentation/DevGuide)。
它会复用（极其通用的）UNO API，这些 API 同样被 StarBasic 中的宏脚本所使用。

不过，向 LibreOffice 添加一个普遍有用的功能，最佳方式还是直接
在代码库上工作。总体而言，这种方式让你更容易编译与构建自己的代码，
它避开了我们脚本 API 中种种任意的限制，而且一般来说要简单直观得多——
前提是你是一名还算胜任的 C++ 程序员。

## 构建链与运行时基线

C++ 基线为 C++23。可用特性受最低编译器版本所约束。

以下是当前运行与编译 LibreOffice 所需的最低操作系统与编译器版本，
TDF（文档基金会）的构建也采用这些版本：

* Windows：
    * 运行时：Windows 10
    * 构建：[wsl-as-helper](https://wiki.documentfoundation.org/Development/BuildingOnWSLWindows) + Visual Studio 2022
* macOS：
    * 运行时：11
    * 构建：macOS 14 配合 Xcode 16.2 或更高版本（使用给定 macOS 版本下可用的 Xcode 最新版本）
* Linux：
    * 运行时：RHEL 9 或 CentOS 9 及相当的系统
    * 构建：GCC 13；或 Clang 18 配合 libstdc++ 11
* iOS（仅适用于 LibreOfficeKit）：
    * 运行时：14.5（仅支持较新的 i 设备 == 64 位）
    * 构建：Xcode 12.5 与 iPhone SDK 14.5
* Android：
    * 构建：NDK 27 与 SDK 30.0.3
* Emscripten / WASM：
    * 运行时：支持 SharedMemory（线程 + 原子操作）的浏览器
    * 构建：Qt 5.15 配合 Qt 所支持的 Emscripten 1.39.8
    * 详见 [README.wasm](https://github.com/LibreOffice/core/blob/master/static/README.wasm.md)

构建 LibreOffice 的许多部分都需要 Java。在 TDF Wiki 文章
[Development/Java](https://wiki.documentfoundation.org/Development/Java) 中，
列出了确切依赖 Java 的模块。

Java 的基线是 JDK（Java Development Kit）17 或更高版本。

Python 的基线是 3.11 版本。它跟随 SUSE Linux Enterprise Desktop 以及
Red Hat Enterprise Linux 维护支持版本中可用的版本。

如果你想把 Clang 配合 LibreOffice 的编译器插件使用，Clang 的最低版本
为 18。由于 Xcode 不提供编译器插件的头文件，你必须在 macOS 上自行
编译 Clang 才能使用这些插件。

你可以在 `distro-configs/` 目录中找到 TDF 的配置开关。

要在 Windows 与 macOS 上搭建初始构建环境，我们提供了
LibreOffice 开发环境
（[LODE](https://wiki.documentfoundation.org/Development/lode)）脚本。

欲了解更多信息，请参阅
[TDF wiki](https://wiki.documentfoundation.org/Development/How_to_build) 中
针对你所用平台的构建说明。

## 代码中的关键部分

每个模块内部都应有一个 `README.md` 文件，对该模块有一定程度的
文档说明；我们非常欢迎提交补丁来改进这些文档。我们已将它们整理成
一个网页：

<https://docs.libreoffice.org/>

不过，这里有两百个模块，其中许多只对特定领域的专家受众才有
边缘性的意义。那么——好东西在哪里，最有用的代码是什么。下面快速
概述其中最重要的部分：

模块    | 说明
----------|-------------------------------------------------
[sal/](https://github.com/LibreOffice/core/tree/master/sal)             | 提供一个简单的系统抽象层（System Abstraction Layer）
[tools/](https://github.com/LibreOffice/core/tree/master/tools)         | 提供基础内部类型：`Rectangle`、`Color` 等。
[vcl/](https://github.com/LibreOffice/core/tree/master/vcl)             | 这是部件工具包（widget toolkit）库以及一种渲染抽象层
[framework/](https://github.com/LibreOffice/core/tree/master/framework) | UNO 框架，负责构建工具栏、菜单、状态栏，以及文档周围的"外壳"（chrome），使用来自 VCL 的部件以及来自 `/uiconfig/` 文件的 XML 描述
[sfx2/](https://github.com/LibreOffice/core/tree/master/sfx2)           | Writer/Calc/Draw 所用的遗留核心框架：文档模型 / 载入与保存 / 动作信号等
[svx/](https://github.com/LibreOffice/core/tree/master/svx)             | 绘图模型相关的辅助代码，包含 Draw/Impress 的大部分内容

然后是各应用程序

模块    | 说明
----------|-------------------------------------------------
[desktop/](https://github.com/LibreOffice/core/tree/master/desktop)  | 应用程序的 `main()` 所在之处，负责初始化 / 引导启动。其名称可追溯到一款同样绘制桌面的古老 StarOffice
[sw/](https://github.com/LibreOffice/core/tree/master/sw)           | Writer（文字处理）
[sc/](https://github.com/LibreOffice/core/tree/master/sc)           | Calc（电子表格）
[sd/](https://github.com/LibreOffice/core/tree/master/sd)           | Draw / Impress（绘图 / 演示）

此外还有几个从图形角度很有帮助的库：

模块    | 说明
----------|-------------------------------------------------
[basegfx/](https://github.com/LibreOffice/core/tree/master/basegfx)  | 画布中所用图形的算法与数据类型
[canvas/](https://github.com/LibreOffice/core/tree/master/canvas)   | 全新的（UNO）画布渲染模型，带有多种后端
[cppcanvas/](https://github.com/LibreOffice/core/tree/master/cppcanvas) | 使用 UNO 画布的 C++ 辅助类
[drawinglayer/](https://github.com/LibreOffice/core/tree/master/drawinglayer) | 用于渲染可绘制对象、并将其拆解为更易渲染的基本图元（primitives）的视图代码。

## #include 指令规则（C/C++）

仅当被包含文件与包含它的文件相邻时，才使用 `"..."` 形式。
否则，使用 `<...>` 形式。（更多细节，请参阅邮件
[Re: C[++]: Normalizing include syntax ("" vs
<>)](https://lists.freedesktop.org/archives/libreoffice/2017-November/078778.html)。）

UNO API 的包含文件应当一致地使用双引号，以惠及该 API 的外部使用者。

`loplugin:includeform (compilerplugins/clang/includeform.cxx)` 会强制执行这些规则。

## 了解更多

除此之外，你可以阅读那些 `README.md` 文件、向我们提交补丁、在邮件列表
libreoffice@lists.freedesktop.org 上提问（无需订阅），或者在 IRC 的
`#libreoffice-dev`（位于 irc.libera.chat）频道上找人交流——
我们是一群友好且通常乐于助人的家伙。我们知道代码一开始可能难以入手，
因此这里不存在什么愚蠢的问题。

## SAST 工具

[PVS-Studio](https://pvs-studio.com/en/pvs-studio/?utm_source=website&utm_medium=github&utm_campaign=open_source) —— 面向 C、C++、C# 与 Java 代码的静态分析器。
