export interface ModuleEntry {
  name: string
  path: string
  summary: string
}

export interface ModuleGroup {
  title: string
  note: string
  modules: ModuleEntry[]
}

const repo = 'https://github.com/LibreOffice/core/tree/master'

/** 模块说明取自 LibreOffice/core 的 README, 中文转述。 */
export const moduleGroups: ModuleGroup[] = [
  {
    title: '核心基础设施',
    note: '想理解套件怎么跑起来，从这几个目录读起。',
    modules: [
      {
        name: 'sal/',
        path: `${repo}/sal`,
        summary: '一层轻量的系统抽象层。',
      },
      {
        name: 'tools/',
        path: `${repo}/tools`,
        summary: '基础内部类型，例如 Rectangle 与 Color。',
      },
      {
        name: 'vcl/',
        path: `${repo}/vcl`,
        summary: '部件工具包库与渲染抽象层，界面长什么样由它决定。',
      },
      {
        name: 'framework/',
        path: `${repo}/framework`,
        summary: 'UNO 框架，用 VCL 部件和 uiconfig 中的 XML 搭出菜单、工具栏与状态栏。',
      },
      {
        name: 'sfx2/',
        path: `${repo}/sfx2`,
        summary: 'Writer、Calc、Draw 共用的遗留核心框架：文档模型、载入保存与动作信号。',
      },
      {
        name: 'svx/',
        path: `${repo}/svx`,
        summary: '绘图模型相关的辅助代码，Draw 与 Impress 的大部分实现在这里。',
      },
    ],
  },
  {
    title: '应用程序',
    note: '六款应用各自的主战场。',
    modules: [
      {
        name: 'desktop/',
        path: `${repo}/desktop`,
        summary: '程序的 main() 所在，负责初始化与启动引导。',
      },
      {
        name: 'sw/',
        path: `${repo}/sw`,
        summary: '文字处理 Writer。',
      },
      {
        name: 'sc/',
        path: `${repo}/sc`,
        summary: '电子表格 Calc。',
      },
      {
        name: 'sd/',
        path: `${repo}/sd`,
        summary: '绘图 Draw 与演示 Impress。',
      },
    ],
  },
  {
    title: '图形库',
    note: '想改渲染效果，从这几个目录下手。',
    modules: [
      {
        name: 'basegfx/',
        path: `${repo}/basegfx`,
        summary: '画布中图形的基础算法与数据类型。',
      },
      {
        name: 'canvas/',
        path: `${repo}/canvas`,
        summary: '全新的 UNO 画布渲染模型，带多种后端。',
      },
      {
        name: 'cppcanvas/',
        path: `${repo}/cppcanvas`,
        summary: '使用 UNO 画布的 C++ 辅助类。',
      },
      {
        name: 'drawinglayer/',
        path: `${repo}/drawinglayer`,
        summary: '把可绘制对象拆成更容易渲染的基本图元。',
      },
    ],
  },
]

export const includeRule = {
  quote:
    '仅当被包含文件与包含它的文件相邻时，才使用 "..." 形式。否则，使用 <...> 形式。',
  extra: 'UNO API 的包含文件应当一致地使用双引号，以惠及该 API 的外部使用者。',
  plugin: 'loplugin:includeform (compilerplugins/clang/includeform.cxx)',
  discussion:
    'https://lists.freedesktop.org/archives/libreoffice/2017-November/078778.html',
}

export const devWays = [
  {
    id: 'core',
    label: '直接在代码库上开发',
    recommended: true,
    body: '想给 LibreOffice 加一个普遍有用的功能，最佳方式还是在代码库上工作。这样更容易编译与构建自己的代码，避开了脚本 API 中种种任意的限制，对一名还算胜任的 C++ 程序员来说也简单直观得多。',
    links: [
      { label: '构建说明', href: 'https://wiki.documentfoundation.org/Development/How_to_build' },
      { label: '模块文档索引', href: 'https://docs.libreoffice.org/' },
    ],
  },
  {
    id: 'sdk',
    label: '用 SDK 写扩展',
    recommended: false,
    body: '这条路相对不那么推荐。它复用极其通用的 UNO API，同一批 API 也被 StarBasic 宏脚本使用，适合在脚本层做扩展，或把现成功能打包成可分发的组件。',
    links: [
      { label: 'API 文档', href: 'https://api.libreoffice.org/' },
      { label: '开发者指南', href: 'https://wiki.documentfoundation.org/Documentation/DevGuide' },
    ],
  },
]
