/**
 * 下载相关数据。
 *
 * 刻意不写死任何版本号：LibreOffice 每年发布多个版本，写死的地址会立刻过期，
 * 也容易让读者装到过时版本。所有入口都是与版本无关的官方页面，由官方页面给出最新稳定版。
 */

/**
 * 平台徽标种类：同一系统的不同架构共用一个徽标。
 */
export type PlatformId = 'windows' | 'macos' | 'linux'

export interface DownloadEntry {
  id: string
  label: string
  note: string
  href: string
}

/** 平台条目比通用条目多一个必填的徽标种类。 */
export interface PlatformEntry extends DownloadEntry {
  platform: PlatformId
}

/**
 * 站内所有“免费下载”类主按钮的统一出口：用户指定的官方下载页。
 * 单独成常量，避免与平台入口数组产生隐式耦合，重排数组也不会漂移。
 */
export const primaryDownloadUrl = 'https://zh-tw.libreoffice.org/下載/'

/**
 * 平台版本入口。点击统一跳官方下载页：官方页面会识别访问者系统并给出
 * 对应架构的安装包与语言包，站内不复制下载文件，也不写死版本号。
 */
export const platformEntries: PlatformEntry[] = [
  {
    id: 'win-x64',
    label: 'Windows (x86-64)',
    note: '主流 PC 与笔记本，64 位 Intel 或 AMD 处理器。',
    href: primaryDownloadUrl,
    platform: 'windows',
  },
  {
    id: 'win-arm64',
    label: 'Windows (ARM64)',
    note: '骁龙等 ARM 架构的 Windows 设备。',
    href: primaryDownloadUrl,
    platform: 'windows',
  },
  {
    id: 'mac-arm64',
    label: 'macOS (Apple Silicon)',
    note: 'M 系列芯片的 Mac。',
    href: primaryDownloadUrl,
    platform: 'macos',
  },
  {
    id: 'mac-x64',
    label: 'macOS (Intel)',
    note: '较早的 Intel 芯片 Mac。',
    href: primaryDownloadUrl,
    platform: 'macos',
  },
  {
    id: 'linux-x64',
    label: 'Linux (x86-64)',
    note: 'DEB、RPM 与 tar.gz 压缩包，按发行版选择。',
    href: primaryDownloadUrl,
    platform: 'linux',
  },
  {
    id: 'linux-arm64',
    label: 'Linux (ARM64)',
    note: '树莓派等 ARM 开发板与 ARM 服务器。',
    href: primaryDownloadUrl,
    platform: 'linux',
  },
]

/** 镜像与历史版本目录。 */
export const mirrorEntries: DownloadEntry[] = [
  {
    id: 'cn-mirror',
    label: '国内镜像',
    note: '腾讯云镜像，目录结构与官方镜像一致，国内下载通常更快。',
    href: 'https://mirrors.cloud.tencent.com/libreoffice/libreoffice/stable/',
  },
  {
    id: 'archive',
    label: '旧版本归档',
    note: '不再更新的历史版本，需要回退或复现问题时查阅。',
    href: 'https://downloadarchive.documentfoundation.org/libreoffice/old/',
  },
]

export type FormatLabel =
  | 'Flatpak'
  | 'Snap'
  | 'Android 与 iOS'
  | 'LibreOffice Online'

/**
 * 其他安装格式与安装方式，全部指向官方说明页。
 * 只保留日常使用会用到的四种：源代码与开发测试版走开发者指南，不在下载页堆入口。
 */
export const formatLinks: { label: FormatLabel; note: string; href: string }[] = [
  {
    label: 'Flatpak',
    note: '沙箱安装，适合不想动系统包管理器的人。',
    href: 'https://zh-cn.libreoffice.org/download/flatpak/',
  },
  {
    label: 'Snap',
    note: '同样由官方维护的 Snap 包。',
    href: 'https://zh-cn.libreoffice.org/download/snap/',
  },
  {
    label: 'Android 与 iOS',
    note: '移动设备上的 Viewer 与编辑能力说明。',
    href: 'https://zh-cn.libreoffice.org/download/android-and-ios/',
  },
  {
    label: 'LibreOffice Online',
    note: '浏览器里直接打开与编辑文档。',
    href: 'https://zh-cn.libreoffice.org/download/libreoffice-online/',
  },
]

/** 与版本无关的下载常识。 */
export const downloadNotes = [
  {
    title: '版本号不写死',
    body: 'LibreOffice 按固定节奏发布新版本。本站不固定任何版本号，安装包请到官方页面获取，保证拿到的是当前稳定版。',
  },
  {
    title: '语言包单独下载',
    body: '界面语言包是独立文件，按主程序的语言与架构选择对应的 langpack，安装后可在「工具 > 选项 > 语言」中切换。',
  },
  {
    title: '离线帮助包',
    body: '离线帮助包同样单独提供，适合无法联网查阅文档的环境。',
  },
]

/** 首页下载区使用的三条说明。 */
export const downloadFacts = [
  {
    title: '始终是当前稳定版',
    body: '版本号由官方页面决定，跟着官方走就不会装到过时版本。',
  },
  {
    title: '系统要求',
    body: 'Windows 10 起、macOS 11 起、RHEL 或 CentOS 9 及相当系统可运行。',
  },
  {
    title: '语言自由切换',
    body: '界面语言包与离线帮助包单独下载，装完主程序再按需补。',
  },
]