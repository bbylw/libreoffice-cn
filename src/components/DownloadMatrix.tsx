import { useState } from 'react'
import {
  CheckIcon,
  CopyIcon,
  DownloadSimpleIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import {
  arches,
  platforms,
  resolveBuild,
  versions,
  type ArchId,
  type Build,
  type LinuxPackageId,
  type PlatformId,
} from '~/data/releases'

const fieldLabel =
  'mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3'

const segmentShell =
  'flex w-full flex-wrap gap-1 rounded-control border border-line bg-surface p-1'

const segmentItem =
  'relative block cursor-pointer select-none rounded-[7px] px-3 py-2 text-center text-sm text-ink-2 transition-colors hover:text-ink peer-checked:bg-brand-bg peer-checked:font-medium peer-checked:text-brand-fg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand'

function Segmented<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string
  legend: string
  options: { id: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <fieldset>
      <legend className={fieldLabel}>{legend}</legend>
      <div className={segmentShell}>
        {options.map((option) => (
          <label key={option.id} className="relative flex-1">
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="peer sr-only"
            />
            <span className={segmentItem}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const formatLabel = (build: Build): string => {
  if (build.platform === 'windows') return 'MSI 安装器'
  if (build.platform === 'macos') return 'DMG 磁盘映像'
  return build.package === 'rpm' ? 'RPM 压缩包' : 'DEB 压缩包'
}

type CopyState = 'idle' | 'copied' | 'failed'

export function DownloadMatrix() {
  const [version, setVersion] = useState<string>(versions[0].id)
  const [platform, setPlatform] = useState<PlatformId>('windows')
  const [arch, setArch] = useState<ArchId>('x86_64')
  const [pkg, setPkg] = useState<LinuxPackageId>('rpm')
  const [copyState, setCopyState] = useState<CopyState>('idle')

  const activePlatform = platforms.find((p) => p.id === platform)!
  const activeVersion = versions.find((v) => v.id === version)!
  const build = resolveBuild({ version, platform, arch, pkg })

  const copyUrl = async () => {
    if (!build) return
    try {
      await navigator.clipboard.writeText(build.url)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    window.setTimeout(() => setCopyState('idle'), 2400)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-8">
      <div className="flex flex-col gap-5 rounded-card border border-line bg-surface p-6">
        <Segmented
          name="version"
          legend="版本"
          value={version}
          onChange={setVersion}
          options={versions.map((v) => ({ id: v.id, label: v.label }))}
        />

        <Segmented
          name="platform"
          legend="操作系统"
          value={platform}
          onChange={setPlatform}
          options={platforms.map((p) => ({ id: p.id, label: p.label }))}
        />

        <Segmented
          name="arch"
          legend="处理器架构"
          value={arch}
          onChange={setArch}
          options={arches.map((a) => ({ id: a.id, label: activePlatform.archLabel[a.id] }))}
        />

        {platform === 'linux' ? (
          <Segmented
            name="pkg"
            legend="安装包类型"
            value={pkg}
            onChange={setPkg}
            options={activePlatform.packages!.map((p) => ({ id: p.id, label: p.label }))}
          />
        ) : null}

        <p className="border-t border-line pt-4 text-xs leading-relaxed text-ink-3">
          {activeVersion.label} 是{activeVersion.channel}。
          {activePlatform.packagesNote ?? '下载地址直接来自 The Document Foundation 镜像。'}
        </p>
      </div>

      <div className="flex flex-col rounded-card border border-line bg-surface p-6 md:p-8">
        {build ? (
          <>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="text-2xl font-semibold tracking-tight text-ink">
                LibreOffice {version}
              </h3>
              <span className="rounded-full bg-brand-soft px-3 py-1 font-mono text-[11px] tracking-[0.1em] text-brand-ink dark:text-brand">
                {formatLabel(build)}
              </span>
              <span className="font-mono text-xs text-ink-3">{activeVersion.channel}</span>
            </div>

            <p className="mt-4 break-all font-mono text-sm leading-relaxed text-ink-2">
              {build.fileName}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={build.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center gap-2 rounded-control bg-brand-bg px-6 text-base font-medium text-brand-fg transition-opacity hover:opacity-95 active:scale-[0.98]"
              >
                <DownloadSimpleIcon size={20} weight="bold" />
                下载安装包
              </a>
              <button
                type="button"
                onClick={copyUrl}
                className="inline-flex h-12 items-center gap-2 rounded-control border border-line bg-bg px-4 text-sm text-ink transition-colors hover:border-brand/50 active:scale-[0.98]"
              >
                {copyState === 'copied' ? (
                  <CheckIcon size={18} weight="bold" />
                ) : (
                  <CopyIcon size={18} weight="bold" />
                )}
                复制地址
              </button>
            </div>

            <p aria-live="polite" className="mt-3 min-h-5 text-xs text-ink-3">
              {copyState === 'copied'
                ? '下载地址已复制到剪贴板。'
                : copyState === 'failed'
                  ? '复制失败，请手动选中上面的文件名获取完整地址。'
                  : '文件来自 The Document Foundation 官方镜像。'}
            </p>

            <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  其他获取方式
                </dt>
                <dd className="mt-2 flex flex-col items-start gap-2 text-sm">
                  <a
                    href={build.torrent}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-ink-2 hover:text-ink"
                  >
                    BT 种子
                  </a>
                  <a
                    href={build.mirrors}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-ink-2 hover:text-ink"
                  >
                    全部镜像列表
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  语言与帮助包
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-2">
                  界面语言包与离线帮助包是独立文件，
                  <a
                    href="https://download.documentfoundation.org/libreoffice/stable/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline hover:text-ink"
                  >
                    在版本目录
                  </a>
                  中找到同架构、同包类型的 langpack 文件。
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-start gap-3">
            <WarningCircleIcon size={28} weight="bold" className="text-ink-3" />
            <h3 className="text-xl font-semibold text-ink">该组合暂无官方安装包</h3>
            <p className="max-w-[46ch] text-sm leading-relaxed text-ink-2">
              当前选择的操作系统、架构与安装包类型没有对应的官方构建。
              请换一个组合，或到旧版本归档中查找。
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
