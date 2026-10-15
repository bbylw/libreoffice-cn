/**
 * 下载相关数据。
 *
 * 刻意不写死任何版本号：LibreOffice 每年发布多个版本，写死的地址会立刻过期，
 * 也容易让读者装到过时版本。所有入口都是与版本无关的官方页面，由官方页面给出最新稳定版。
 */

export interface DownloadEntry {
  id: string
  label: string
  note: string
  href: string
}

/**
 * 站内所有“免费下载”类主按钮的统一出口：用户指定的官方下载页。
 * 单独成常量，避免与 downloadPages[0] 产生隐式耦合，重排数组也不会漂移。
 */
export const primaryDownloadUrl = 'https://zh-tw.libreoffice.org/下載/'

/** 官方下载页入口。三个页面提供同一套构建，只是说明语言不同。 */
export const downloadPages: DownloadEntry[] = [
  {
    id: 'zh-tw',
    label: '繁体中文官网下载页',
    note: '本站主按钮的跳转目标，同一套构建，并提供语言包与帮助包下载。',
    href: primaryDownloadUrl,
  },
  {
    id: 'zh-cn',
    label: '简体中文官网下载页',
    note: '同一套构建，习惯简体中文说明的读者用这个。',
    href: 'https://zh-cn.libreoffice.org/download/libreoffice/',
  },
  {
    id: 'intl',
    label: '国际版下载页',
    note: '英文为主的通用页面，镜像选择更多。',
    href: 'https://www.libreoffice.org/download/',
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
    id: 'stable-dir',
    label: '官方稳定版目录',
    note: '按版本列出全部文件，含各架构安装包、语言包与帮助包。',
    href: 'https://download.documentfoundation.org/libreoffice/stable/',
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
  | '源代码'
  | '开发测试版'

/** 其他打包格式与安装方式，全部指向官方说明页。 */
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
  {
    label: '源代码',
    note: '自行编译需要从这里取源码。',
    href: 'https://zh-cn.libreoffice.org/download/source-code/',
  },
  {
    label: '开发测试版',
    note: '尝鲜用的预发布版本，不建议日常使用。',
    href: 'https://zh-cn.libreoffice.org/download/pre-releases/',
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