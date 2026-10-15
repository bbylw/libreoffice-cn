import { createFileRoute } from '@tanstack/react-router'
import { ArrowSquareOutIcon } from '@phosphor-icons/react'
import { DownloadMatrix } from '~/components/DownloadMatrix'
import { Reveal } from '~/components/Reveal'
import { SectionHeading } from '~/components/SectionHeading'
import { currentVersion, relatedLinks } from '~/data/releases'
import { buildEnvLinks, requirements } from '~/data/requirements'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/download')({
  head: () => ({
    meta: seo({
      title: `下载 LibreOffice ${currentVersion} | 各平台安装包`,
      description:
        '选择版本、操作系统与处理器架构，直接获取 LibreOffice 26.8.1 的官方安装包，并附运行与构建的系统要求。',
    }),
  }),
  component: DownloadPage,
})

const notes = [
  {
    title: '界面语言包',
    body: '语言包是独立文件，安装主程序后再按需下载对应架构的 langpack，在「工具 > 选项 > 语言」中切换。',
  },
  {
    title: '离线帮助包',
    body: '离线帮助包同样单独提供，适合无法联网查阅文档的环境。',
  },
  {
    title: '旧版本',
    body: '不再更新的历史版本保留在归档站点，需要回退或复现问题时可以查阅。',
  },
]

const otherWays = [
  { label: '其他版本与安装方式（含源码与 SDK）', href: relatedLinks.otherVersions },
  { label: '完整发布说明', href: relatedLinks.releaseNotes },
  { label: '稳定版文件列表（含语言包）', href: relatedLinks.fileList },
  { label: '旧版本归档', href: relatedLinks.archive },
  { label: '扩展与模板市场', href: relatedLinks.extensions },
  { label: '商业支持（TDF 专业支持）', href: 'https://www.documentfoundation.org/professional-support/' },
]

function DownloadPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-14 md:py-20">
          <Reveal mode="mount">
            <p className="eyebrow">LibreOffice {currentVersion} 稳定版</p>
          </Reveal>
          <Reveal mode="mount" delay={0.06}>
            <h1 className="mt-4 max-w-[18ch] text-4xl font-semibold leading-[1.15] tracking-tight text-ink md:text-5xl">
              下载 LibreOffice
            </h1>
          </Reveal>
          <Reveal mode="mount" delay={0.12}>
            <p className="mt-5 max-w-[52ch] text-base text-ink-2 md:text-[17px]">
              选好版本与平台，下面的地址会直接指向 The Document Foundation
              的官方镜像。同时仍在维护的 26.2 系列也放在这里。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <Reveal>
          <SectionHeading
            id="matrix"
            title="选择版本与平台"
            body="所有安装包都是官方构建，下载地址按官方镜像目录规则生成。"
          />
        </Reveal>
        <div className="mt-8">
          <DownloadMatrix />
        </div>

        <Reveal delay={0.06}>
          <ul className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-8 md:grid-cols-3">
            {notes.map((note) => (
              <li key={note.title}>
                <h3 className="text-[15px] font-medium text-ink">{note.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{note.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-20 md:py-24">
          <Reveal>
            <SectionHeading
              id="requirements"
              title="运行与构建要求"
              body="下面的版本基线来自 LibreOffice 源码仓库的构建说明。运行要求只影响能否启动，构建要求影响能否编译源码。"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
            {requirements.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05}>
                <div className="h-full rounded-card border border-line bg-bg p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                    {item.name}
                  </p>
                  <p className="mt-3 font-mono text-xl font-medium tracking-tight text-ink">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {buildEnvLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-brand-ink dark:hover:text-brand"
                >
                  {link.label}
                  <ArrowSquareOutIcon size={15} weight="bold" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <Reveal>
          <SectionHeading title="其他获取方式" />
        </Reveal>
        <Reveal delay={0.06}>
          <ul className="mt-8 grid gap-x-12 gap-y-1 sm:grid-cols-2">
            {otherWays.map((link) => (
              <li key={link.href} className="border-b border-line last:border-b-0">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between gap-4 py-4 text-[15px] text-ink-2 transition-colors hover:text-ink"
                >
                  {link.label}
                  <ArrowSquareOutIcon size={16} weight="bold" className="shrink-0 text-ink-3" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  )
}
