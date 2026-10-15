/**
 * 下载数据。
 *
 * 下载地址遵循 LibreOffice 官方镜像目录规则：
 * https://download.documentfoundation.org/libreoffice/stable/<版本>/<平台目录>/<架构>/<文件名>
 * 这里只做字符串拼接，不虚构任何校验和或文件体积。
 */

export type PlatformId = 'windows' | 'macos' | 'linux'
export type ArchId = 'x86_64' | 'aarch64'
export type LinuxPackageId = 'rpm' | 'deb'

export interface ReleaseVersion {
  id: string
  label: string
  channel: string
  note: string
}

export interface Platform {
  id: PlatformId
  label: string
  archLabel: Record<ArchId, string>
  packages?: { id: LinuxPackageId; label: string }[]
  packagesNote?: string
}

export interface Build {
  platform: PlatformId
  arch: ArchId
  package: LinuxPackageId | 'native'
  fileName: string
  url: string
  torrent: string
  mirrors: string
}

export const currentVersion = '26.8.1'

export const versions: ReleaseVersion[] = [
  { id: '26.8.1', label: '26.8.1', channel: '稳定版', note: '当前推荐的版本' },
  { id: '26.2.6', label: '26.2.6', channel: '维护版', note: '仍在接收修复更新' },
]

export const platforms: Platform[] = [
  {
    id: 'windows',
    label: 'Windows',
    archLabel: { x86_64: 'x86-64', aarch64: 'ARM64' },
  },
  {
    id: 'macos',
    label: 'macOS',
    archLabel: { x86_64: 'Intel', aarch64: 'Apple Silicon' },
  },
  {
    id: 'linux',
    label: 'Linux',
    archLabel: { x86_64: 'x86-64', aarch64: 'ARM64' },
    packages: [
      { id: 'rpm', label: 'rpm' },
      { id: 'deb', label: 'deb' },
    ],
    packagesNote: 'Linux 版本由发行版自行打包，更推荐使用系统仓库中的软件包。',
  },
]

export const arches: { id: ArchId; label: string }[] = [
  { id: 'x86_64', label: 'x86-64' },
  { id: 'aarch64', label: 'ARM64' },
]

/** 官方镜像目录中，各平台对应的路径片段。 */
const directoryOf: Record<PlatformId, Record<ArchId, string>> = {
  windows: { x86_64: 'win/x86_64', aarch64: 'win/aarch64' },
  macos: { x86_64: 'mac/x86_64', aarch64: 'mac/aarch64' },
  linux: { x86_64: '', aarch64: '' },
}

const archToken = (arch: ArchId) => (arch === 'x86_64' ? 'x86-64' : 'aarch64')

function fileName(
  version: string,
  platform: PlatformId,
  arch: ArchId,
  pkg: LinuxPackageId,
): string {
  if (platform === 'windows') return `LibreOffice_${version}_Win_${archToken(arch)}.msi`
  if (platform === 'macos') return `LibreOffice_${version}_MacOS_${archToken(arch)}.dmg`
  return `LibreOffice_${version}_Linux_${archToken(arch)}_${pkg}.tar.gz`
}

/**
 * 拼接某个版本 + 平台 + 架构 (+ Linux 包类型) 的下载地址。
 * 组合不存在时返回 null, 调用方需要给出明确的空状态而不是渲染坏链接。
 */
export function resolveBuild(options: {
  version: string
  platform: PlatformId
  arch: ArchId
  pkg?: LinuxPackageId
}): Build | null {
  const { version, platform, arch, pkg } = options
  const isLinux = platform === 'linux'

  if (isLinux && (pkg !== 'rpm' && pkg !== 'deb')) return null

  const dir = isLinux ? `${pkg}/${arch}` : directoryOf[platform][arch]
  const name = fileName(version, platform, arch, (pkg ?? 'deb') as LinuxPackageId)
  const base = `https://download.documentfoundation.org/libreoffice/stable/${version}/${dir}/${name}`

  return {
    platform,
    arch,
    package: isLinux ? (pkg as LinuxPackageId) : 'native',
    fileName: name,
    url: base,
    torrent: `${base}.torrent`,
    mirrors: `${base}.mirrorlist`,
  }
}

export const homeQuickDownloads: {
  key: string
  label: string
  meta: string
  build: Build
}[] = [
  {
    key: 'win-x86',
    label: 'Windows',
    meta: 'x86-64',
    build: resolveBuild({
      version: currentVersion,
      platform: 'windows',
      arch: 'x86_64',
    })!,
  },
  {
    key: 'win-arm',
    label: 'Windows',
    meta: 'ARM64',
    build: resolveBuild({
      version: currentVersion,
      platform: 'windows',
      arch: 'aarch64',
    })!,
  },
  {
    key: 'mac-arm',
    label: 'macOS',
    meta: 'Apple Silicon',
    build: resolveBuild({
      version: currentVersion,
      platform: 'macos',
      arch: 'aarch64',
    })!,
  },
  {
    key: 'mac-intel',
    label: 'macOS',
    meta: 'Intel',
    build: resolveBuild({
      version: currentVersion,
      platform: 'macos',
      arch: 'x86_64',
    })!,
  },
]

export const relatedLinks = {
  archive: 'https://downloadarchive.documentfoundation.org/libreoffice/old/',
  fileList: 'https://download.documentfoundation.org/libreoffice/stable/',
  releaseNotes: 'https://www.libreoffice.org/download/release-notes/',
  otherVersions: 'https://www.libreoffice.org/download/download-other/',
  extensions: 'https://extensions.libreoffice.org/',
  tdf: 'https://www.documentfoundation.org/',
}
