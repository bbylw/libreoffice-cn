import { createFileRoute } from '@tanstack/react-router'
import {
  BookOpenTextIcon,
  BriefcaseIcon,
  CloudIcon,
  CodeIcon,
  CubeIcon,
  DeviceMobileIcon,
  FlaskIcon,
  GlobeHemisphereWestIcon,
  HexagonIcon,
  InfoIcon,
  NotePencilIcon,
  PuzzlePieceIcon,
  QuestionIcon,
  TranslateIcon,
  ArrowsClockwiseIcon,
} from '@phosphor-icons/react'
import { Reveal } from '~/components/Reveal'
import { SectionHeading } from '~/components/SectionHeading'
import { ButtonLink } from '~/components/ButtonLink'
import {
  downloadNotes,
  downloadPages,
  formatLinks,
  mirrorEntries,
  type FormatLabel,
} from '~/data/downloads'
import { buildEnvLinks, requirements } from '~/data/requirements'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/download')({
  head: () => ({
    meta: seo({
      title: '下载 LibreOffice | 官方下载入口与安装方式',
      description:
        'LibreOffice 版本号持续更新，本站不写死任何版本。提供简体中文官网、繁体中文官网、国际版下载页入口，以及国内镜像、其他安装格式与系统要求。',
    }),
  }),
  component: DownloadPage,
})

/** 图标按名称匹配，键与 formatLinks 的 label 同源，漂移会在类型层暴露。 */
const formatIcons: Record<FormatLabel, typeof CubeIcon> = {
  Flatpak: CubeIcon,
  Snap: HexagonIcon,
  'Android 与 iOS': DeviceMobileIcon,
  'LibreOffice Online': CloudIcon,
  源代码: CodeIcon,
  开发测试版: FlaskIcon,
}

const noteIcons = [ArrowsClockwiseIcon, TranslateIcon, BookOpenTextIcon]

const helpLinks = [
  {
    label: '扩展与模板市场',
    note: '为各模块补充模板与功能扩展。',
    href: 'https://zh-cn.libreoffice.org/discover/templates-and-extensions/',
    icon: PuzzlePieceIcon,
  },
  {
    label: '发行注记',
    note: '当前版本带来的功能与修复清单。',
    href: 'https://zh-cn.libreoffice.org/download/release-notes/',
    icon: NotePencilIcon,
  },
  {
    label: '常见问题',
    note: '安装、更新与使用上的高频问题。',
    href: 'https://www.libreoffice.org/faq/',
    icon: QuestionIcon,
  },
  {
    label: '商业支持',
    note: '企业级支持由 TDF 提供的专业服务。',
    href: 'https://www.documentfoundation.org/professional-support/',
    icon: BriefcaseIcon,
  },
]

function DownloadPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-14 md:py-20">
          <Reveal mode="mount">
            <p className="eyebrow">下载</p>
          </Reveal>
          <Reveal mode="mount" delay={0.06}>
            <h1 className="mt-4 max-w-[18ch] text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-ink md:text-5xl">
              获取 LibreOffice
            </h1>
          </Reveal>
          <Reveal mode="mount" delay={0.12}>
            <p className="mt-5 max-w-[56ch] text-base text-ink-2 md:text-[17px]">
              LibreOffice 按固定节奏发布新版本，写死的版本号很快就会过期。
              本站不固定任何版本，安装包请到官方页面获取，由官方维护为当前稳定版。
            </p>
          </Reveal>
          <Reveal mode="mount" delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={downloadPages[0].href}>
                <GlobeHemisphereWestIcon size={20} weight="bold" />
                前往官方下载页
              </ButtonLink>
              <ButtonLink href="#requirements" variant="secondary">
                先看系统要求
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <Reveal>
          <SectionHeading
            id="pages"
            title="官方下载入口"
            body="三个页面提供的是同一套构建。简体中文官网会按你的系统给出对应安装包，并附带语言包下载。"
          />
        </Reveal>

        <ul className="mt-8">
          {downloadPages.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.05}>
              <li className="border-b border-line">
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span className="text-lg font-medium tracking-tight text-ink">
                    {entry.label}
                  </span>
                  <span className="max-w-[48ch] text-sm leading-relaxed text-ink-2 sm:text-right">
                    {entry.note}
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-x-12 gap-y-1 sm:grid-cols-2">
            {mirrorEntries.map((entry) => (
              <div key={entry.id} className="border-b border-line">
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-start justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block text-[15px] font-medium text-ink">{entry.label}</span>
                    <span className="mt-1 block max-w-[44ch] text-sm leading-relaxed text-ink-2">
                      {entry.note}
                    </span>
                  </span>
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-20 md:py-24">
          <Reveal>
            <SectionHeading title="其他安装格式" />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {formatLinks.map((item, index) => {
              const Icon = formatIcons[item.label] ?? InfoIcon
              return (
                <Reveal key={item.href} delay={index * 0.04}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex h-full flex-col rounded-card border border-line bg-bg p-6 transition-colors hover:border-brand/45"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-control border border-line bg-surface text-ink-2 transition-colors group-hover:text-brand-ink dark:group-hover:text-brand">
                        <Icon size={18} weight="bold" />
                      </span>
                      <span className="text-base font-medium text-ink">{item.label}</span>
                    </span>
                    <span className="mt-3 flex-1 text-sm leading-relaxed text-ink-2">
                      {item.note}
                    </span>
                  </a>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <Reveal>
          <SectionHeading
            title="版本与语言包"
            body="版本、语言包和帮助包是最容易搞混的三件事，先看一眼能省不少时间。"
          />
        </Reveal>
        <Reveal delay={0.06}>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {downloadNotes.map((note, index) => {
              const Icon = noteIcons[index] ?? InfoIcon
              return (
                <li key={note.title} className="flex gap-4">
                  <Icon size={22} weight="bold" className="mt-0.5 shrink-0 text-ink-3" />
                  <div>
                    <h3 className="text-base font-medium text-ink">{note.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{note.body}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-20 md:py-24">
          <Reveal>
            <SectionHeading
              id="requirements"
              title="运行与构建要求"
              body="下面的版本基线来自 LibreOffice 源码仓库的构建说明，与具体发行版无关。运行要求只影响能否启动，构建要求影响能否编译源码。"
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
                  className="text-sm text-ink-2 transition-colors hover:text-brand-ink dark:hover:text-brand"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <Reveal>
          <SectionHeading title="不确定选哪个" />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {helpLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <Reveal key={link.href} delay={index * 0.05}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex h-full items-start gap-4 rounded-card border border-line bg-surface p-6 transition-colors hover:border-brand/45"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-control border border-line bg-bg text-ink-2 transition-colors group-hover:text-brand-ink dark:group-hover:text-brand">
                    <Icon size={18} weight="bold" />
                  </span>
                  <span>
                    <span className="block text-base font-medium text-ink">{link.label}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-2">{link.note}</span>
                  </span>
                </a>
              </Reveal>
            )
          })}
        </div>
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="max-w-[52ch] text-sm text-ink-3">
              首页的下载入口同样指向官方页面，站内不会出现写死的版本号。
            </p>
            <ButtonLink to="/" variant="secondary">
              回到首页
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}