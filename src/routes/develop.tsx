import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowSquareOutIcon,
  CheckCircleIcon,
  TerminalWindowIcon,
} from '@phosphor-icons/react'
import { Reveal } from '~/components/Reveal'
import { SectionHeading } from '~/components/SectionHeading'
import { ButtonLink } from '~/components/ButtonLink'
import { devWays, includeRule, moduleGroups } from '~/data/modules'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/develop')({
  head: () => ({
    meta: seo({
      title: '开发者指南 | 从模块结构到构建基线',
      description:
        'LibreOffice 的两条开发路径、关键模块速览、C/C++ 头文件包含规则，以及上手时可以求助的地方。',
    }),
  }),
  component: DevelopPage,
})

const includeSample = `#include "myhelper.hxx"                    // 与当前文件相邻，用双引号
#include <sal/macros.h>                        // 其他位置，用尖括号
#include <vcl/inc/vcl.h>
#include "com/sun/star/uno/XComponent.hxx"     // UNO API 统一用双引号`

const learnMore = [
  { label: '邮件列表 libreoffice@lists.freedesktop.org', href: 'https://lists.freedesktop.org/archives/list/libreoffice/' },
  { label: 'IRC 频道 #libreoffice-dev（irc.libera.chat）', href: 'https://web.libera.chat/#libreoffice-dev' },
  { label: 'TDF Wiki 构建说明', href: 'https://wiki.documentfoundation.org/Development/How_to_build' },
  { label: 'API 文档 api.libreoffice.org', href: 'https://api.libreoffice.org/' },
  { label: '模块文档索引 docs.libreoffice.org', href: 'https://docs.libreoffice.org/' },
  { label: '源码仓库 LibreOffice/core', href: 'https://github.com/LibreOffice/core' },
]

const tools = [
  {
    label: 'PVS-Studio',
    body: '面向 C、C++、C# 与 Java 代码的静态分析器，LibreOffice 用它做 SAST 扫描。',
    href: 'https://pvs-studio.com/',
  },
  {
    label: 'loplugin:includeform',
    body: '编译期强制执行头文件包含规则的插件，路径 compilerplugins/clang/includeform.cxx。',
    href: 'https://github.com/LibreOffice/core/tree/master/compilerplugins/clang/includeform.cxx',
  },
]

function DevelopPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-14 md:py-20">
          <Reveal mode="mount">
            <p className="eyebrow">开发者指南</p>
          </Reveal>
          <Reveal mode="mount" delay={0.06}>
            <h1 className="mt-4 max-w-[20ch] text-4xl font-semibold leading-[1.15] tracking-tight text-ink md:text-5xl">
              把改动放进 LibreOffice
            </h1>
          </Reveal>
          <Reveal mode="mount" delay={0.12}>
            <p className="mt-5 max-w-[54ch] text-base text-ink-2 md:text-[17px]">
              写扩展，或者直接改代码库。下面是两条路径的差别、最值得先读的模块，以及提交改动时会用到的约定。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <Reveal>
          <SectionHeading title="两条开发路径" />
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {devWays.map((way, index) => (
            <Reveal key={way.id} delay={index * 0.06}>
              <article
                className={`flex h-full flex-col rounded-card border p-7 ${
                  way.recommended
                    ? 'border-brand/45 bg-brand-soft/40'
                    : 'border-line bg-surface'
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold tracking-tight text-ink">{way.label}</h3>
                  {way.recommended ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 font-mono text-[11px] tracking-[0.1em] text-brand-ink dark:text-brand">
                      <CheckCircleIcon size={14} weight="bold" />
                      推荐路径
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-2">{way.body}</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {way.links.map((link) => (
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
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-20 md:py-24">
          <Reveal>
            <SectionHeading
              title="代码中的关键部分"
              body="仓库里有两百个模块，很多只对特定领域的专家才有意义。下面这些是最值得先读的几个。"
            />
          </Reveal>

          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {moduleGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.06}>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-ink">
                    {group.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-3">{group.note}</p>
                  <ul className="mt-5 space-y-4">
                    {group.modules.map((module) => (
                      <li key={module.name}>
                        <a
                          href={module.path}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-mono text-sm text-brand-ink transition-colors hover:text-brand dark:text-brand"
                        >
                          {module.name}
                        </a>
                        <p className="mt-1 text-sm leading-relaxed text-ink-2">
                          {module.summary}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <Reveal>
              <SectionHeading
                title="#include 指令规则"
                body="这一条规则看似琐碎，但它统一了整个仓库的风格，编译期就会检查。"
              />
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-ink-2">
                {includeRule.quote}
                <br />
                {includeRule.extra}
              </p>
              <a
                href={includeRule.discussion}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-brand-ink dark:hover:text-brand"
              >
                规则讨论原文
                <ArrowSquareOutIcon size={15} weight="bold" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-card border border-line bg-surface">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <TerminalWindowIcon size={18} weight="bold" className="text-ink-3" />
                <span className="font-mono text-xs text-ink-3">includeform.cxx 约定的写法</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-ink-2">
                <code>{includeSample}</code>
              </pre>
            </div>

            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {tools.map((tool) => (
                <div key={tool.label} className="rounded-card border border-line bg-surface p-5">
                  <dt className="font-mono text-sm text-ink">{tool.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-2">
                    {tool.body}
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline ml-1 whitespace-nowrap hover:text-ink"
                    >
                      查看
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="container-page py-16 md:py-20">
          <Reveal>
            <SectionHeading
              title="想不清楚就来问"
              body="邮件列表无需订阅即可提问，IRC 频道里也总有乐于帮忙的人。代码刚开始看时没有任何愚蠢的问题。"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="mt-8 grid gap-x-12 gap-y-1 sm:grid-cols-2">
              {learnMore.map((link) => (
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
          <Reveal delay={0.12}>
            <div className="mt-10">
              <ButtonLink to="/community" variant="secondary">
                查看社区参与方式
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
