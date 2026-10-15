import { createFileRoute } from '@tanstack/react-router'
import {
  BookOpenTextIcon,
  CodeIcon,
  DownloadSimpleIcon,
} from '@phosphor-icons/react'
import { Reveal, RevealGroup } from '~/components/Reveal'
import { SectionHeading } from '~/components/SectionHeading'
import { ButtonLink } from '~/components/ButtonLink'
import { apps, type AppLayout } from '~/data/apps'
import { moduleGroups } from '~/data/modules'
import { memberQuotes, pressQuotes } from '~/data/community'
import { downloadFacts, primaryDownloadUrl } from '~/data/downloads'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: seo({
      title: 'LibreOffice 中文站 | 免费开源办公套件',
      description:
        'LibreOffice 是一套开源办公套件，兼容绝大多数文档格式与标准。这里整理六款应用的介绍、官方下载入口、代码结构速览与社区参与方式。',
    }),
  }),
  component: HomePage,
})

const reasons = [
  {
    id: 'free',
    image: '/media/illustration-free.png',
    title: '不收费，也没有订阅',
    body: '办公生产力工具完全免费，不需要付费账号，不联网也能正常编辑。',
  },
  {
    id: 'language',
    image: '/media/illustration-language.png',
    title: '覆盖世界各地的语言',
    body: '社区持续翻译界面、帮助文档并参与维护工作，语言包由志愿者共同维护。',
  },
  {
    id: 'community',
    image: '/media/illustration-community.png',
    title: '开放共建，随读随改',
    body: '开发对所有人开放，代码可以自由研究、修改和分发，由一个庞大的用户社区日常检验。',
  },
]

const newFeatures = [
  {
    id: 'markdown',
    title: 'Markdown 导入与导出',
    body: '可以直接读写 Markdown 这种轻量标记语言，纯文本与排版结果之间不再需要来回转换。',
  },
  {
    id: 'connector',
    title: 'Writer 与 Calc 的连接线',
    body: 'Writer 里像 Impress 一样连接对象；Calc 通过「插入 > 形状 > 连接线」连接单元格。',
  },
  {
    id: 'perf',
    title: '一批性能改进',
    body: 'EPUB 导出、滚动速度、含位图的 SVG 导出、3D 图表等场景都获得了性能提升。',
  },
]

/**
 * 卡片版式的唯一查表处：数据给 layout，渲染只读表。
 * 新增应用时只改 data/apps.ts，不碰这里的分支。
 */
const appLayouts: Record<AppLayout, { span: string; aspect: string; row: boolean }> = {
  large: { span: 'md:col-span-3', aspect: 'aspect-[16/10]', row: false },
  standard: { span: 'md:col-span-2', aspect: 'aspect-[4/3]', row: false },
  wide: { span: 'md:col-span-6', aspect: 'aspect-[16/10] md:h-full', row: true },
}

function HomePage() {
  return (
    <>
      {/* 首屏：左侧文案，右侧真实产品截图 */}
      <section className="border-b border-line">
        <div className="container-page grid items-center gap-12 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 md:py-20">
          <div>
            <Reveal mode="mount">
              <p className="eyebrow">开源办公套件</p>
            </Reveal>
            <Reveal mode="mount" delay={0.06}>
              <h1 className="mt-4 text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-ink md:text-[3rem] md:leading-[1.16]">
                由你创造，
                <br />
                为你而生的开源办公套件
              </h1>
            </Reveal>
            <Reveal mode="mount" delay={0.12}>
              <p className="mt-6 max-w-[46ch] text-base text-ink-2 md:text-[17px]">
                兼容绝大多数文档格式与标准，免费使用，不需要订阅。六款应用，一个套件，由全球社区共同维护。
              </p>
            </Reveal>
            <Reveal mode="mount" delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href={primaryDownloadUrl}>
                  <DownloadSimpleIcon size={20} weight="bold" />
                  免费下载
                </ButtonLink>
                <ButtonLink to="/develop" variant="secondary">
                  阅读开发指南
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal mode="mount" delay={0.1} y={26}>
            <figure className="rounded-card border border-line bg-surface p-2 shadow-[0_28px_70px_-40px_rgba(15,19,21,0.55)] dark:shadow-[0_28px_70px_-40px_rgba(0,0,0,0.9)]">
              <img
                src="/media/screenshot_writer_hero.png"
                alt="LibreOffice Writer 打开一份 Writer 指南文档的界面截图"
                width={1016}
                height={713}
                fetchPriority="high"
                decoding="async"
                className="w-full rounded-[10px]"
              />
              <figcaption className="px-3 py-3 text-xs text-ink-3">
                Writer 界面：样式、导航窗格与状态栏在同一屏内协作。
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 六款应用：4+2 / 2+2+2 / 整行的非对称网格，六个内容六格 */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            title="一套软件，六种工作方式"
            body="六个模块共用同一套文档模型、同一套界面语言，也共用同一个安装包。"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-6">
          {apps.map((app, index) => {
            const layout = appLayouts[app.layout]

            return (
              <Reveal key={app.id} className={layout.span} delay={index * 0.05}>
                <article
                  className={`group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors hover:border-brand/45 ${
                    layout.row ? 'md:flex-row' : ''
                  }`}
                >
                  <div
                    className={`overflow-hidden bg-surface-2 ${
                      layout.row ? 'md:w-1/2' : ''
                    }`}
                  >
                    <img
                      src={app.image}
                      alt={`${app.name} ${app.en} 的界面截图`}
                      width={app.width}
                      height={app.height}
                      loading="lazy"
                      decoding="async"
                      className={`w-full object-cover transition-transform duration-500 ${layout.aspect}`}
                    />
                  </div>
                  <div className={`flex flex-1 flex-col p-6 ${layout.row ? 'md:justify-center md:p-8' : ''}`}>
                    <div className="flex items-center gap-3">
                      <img src={app.icon} alt="" width={28} height={28} className="size-7" />
                      <h3 className="text-xl font-semibold tracking-tight text-ink">
                        {app.name}
                        <span className="ml-2 font-mono text-sm font-normal text-ink-3">
                          {app.en}
                        </span>
                      </h3>
                    </div>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">
                      {app.summary}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-xs text-ink-3">{app.formats}</span>
                      <a
                        href={app.guideUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-brand-ink dark:hover:text-brand"
                      >
                        <BookOpenTextIcon size={17} weight="bold" />
                        官方手册
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* 为什么选择：带插图的三行清单，单一分隔线家族 */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading
              title="为什么选择 LibreOffice"
              body="三件事决定了这个项目能走到今天：没有付费门槛、语言覆盖足够广、代码对所有人开放。"
            />
          </Reveal>

          <ul className="mt-10 max-w-[76ch]">
            {reasons.map((reason, index) => (
              <Reveal key={reason.id} delay={index * 0.06}>
                <li
                  className={`grid gap-5 py-8 sm:grid-cols-[88px_minmax(0,1fr)] sm:items-center ${
                    index > 0 ? 'border-t border-line' : ''
                  }`}
                >
                  <img
                    src={reason.image}
                    alt=""
                    width={280}
                    height={260}
                    loading="lazy"
                    decoding="async"
                    className="size-20 justify-self-start sm:size-[88px]"
                  />
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {reason.title}
                    </h3>
                    <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-ink-2">
                      {reason.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 新特性：一张大图加两段说明，避免再做第三组等宽卡片 */}
      <section className="container-page py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">新功能</p>
            <figure className="mt-5">
              <div className="overflow-hidden rounded-card border border-line bg-surface p-2">
                <img
                  src="/media/feature-markdown.png"
                  alt="LibreOffice 中 Markdown 源文件与渲染后的排版结果并排显示"
                  width={2252}
                  height={1222}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-[10px]"
                />
              </div>
              <figcaption className="mt-3 text-xs text-ink-3">
                左侧是 Markdown 源文件，右侧是同一份内容的排版结果。
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
                最近几个版本带来了什么
              </h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">
                下面列出的是近期几个版本里比较有代表性的变化，不是当前版本的完整清单。
              </p>
            </Reveal>
            <div className="mt-8 flex flex-col gap-8">
              {newFeatures.map((feature, index) => (
                <Reveal key={feature.id} delay={index * 0.07}>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                      {feature.body}
                    </p>
                    {feature.id === 'connector' ? (
                      <img
                        src="/media/feature-connectors.png"
                        alt="Calc 中用连接线连接两个单元格"
                        width={335}
                        height={193}
                        loading="lazy"
                        decoding="async"
                        className="mt-4 w-full max-w-[320px] rounded-card border border-line bg-surface p-1"
                      />
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <a
                href="https://zh-cn.libreoffice.org/download/release-notes/"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-brand-ink dark:hover:text-brand"
              >
                查看当前版本的完整发行注记
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 下载条：主按钮直跳官方页，次按钮进站内选项页；只讲版本策略，不钉死版本号 */}
      <section className="border-y border-line bg-surface-2">
        <div className="container-page py-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                下载当前稳定版
              </h2>
              <p className="mt-3 max-w-[44ch] text-[15px] text-ink-2">
                本站不写死任何版本号。LibreOffice 按固定节奏发布新版本，安装包统一到官方页面获取，由官方维护为当前稳定版。
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ButtonLink href={primaryDownloadUrl}>
                  <DownloadSimpleIcon size={20} weight="bold" />
                  免费下载
                </ButtonLink>
                <ButtonLink to="/download" variant="secondary">
                  更多下载选项
                </ButtonLink>
              </div>
            </div>

            <dl className="grid gap-x-8 sm:grid-cols-3">
              {downloadFacts.map((fact, index) => (
                <Reveal key={fact.title} delay={index * 0.06}>
                  <div className="border-t border-line py-5 sm:mt-0 sm:pt-5">
                    <dt className="text-[15px] font-medium text-ink">{fact.title}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">{fact.body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 代码结构：三组等宽字体清单，只保留最关键的模块 */}
      <section className="container-page py-20 md:py-28">
        <Reveal>
          <SectionHeading
            title="想读代码，从这几个目录开始"
            body="仓库里有两百个模块，其中最值得先读的是下面这些。想动手改功能时，直接在代码库上工作比写脚本扩展更顺手。"
          />
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {moduleGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.06}>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  {group.title}
                </h3>
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

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
            <p className="font-mono text-sm text-ink-3">docs.libreoffice.org</p>
            <a
              href="https://docs.libreoffice.org/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-brand-ink dark:hover:text-brand"
            >
              <CodeIcon size={17} weight="bold" />
              两百个模块的文档索引
            </a>
            <ButtonLink to="/develop" variant="secondary">
              开发者指南
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* 社区：第二处图文分栏，与首屏的构图不同 (图在左，文字带引言) */}
      <section className="border-t border-line bg-surface">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:items-center md:gap-14 md:py-28">
          <Reveal>
            <figure>
              <img
                src="/media/community_conference_photo.jpg"
                alt="LibreOffice 社区年度线下聚会现场"
                width={600}
                height={580}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-card border border-line object-cover"
              />
              <figcaption className="mt-3 text-xs text-ink-3">
                每年一次的社区聚会，讨论、工作坊与协作。
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
                由社区维护，也由社区决定方向
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 max-w-[50ch] text-[15px] leading-relaxed text-ink-2">
                LibreOffice 由 The Document Foundation
                背书，背后是一个由企业、开发者和志愿者组成的独立社区。任何人都可以研究它的运作方式，并提交改进。
              </p>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {memberQuotes.map((member, index) => (
                <Reveal key={member.name} delay={0.1 + index * 0.07}>
                  <figure>
                    <img
                      src={member.photo}
                      alt={`${member.name} 的照片`}
                      width={member.width}
                      height={member.height}
                      loading="lazy"
                      decoding="async"
                      className="size-16 rounded-full border border-line object-cover"
                    />
                    <blockquote className="mt-4 text-[15px] leading-relaxed text-ink">
                      「{member.quote}」
                    </blockquote>
                    <figcaption className="mt-2 text-sm text-ink-3">
                      {member.name}，{member.role}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.24}>
              <ButtonLink to="/community" className="mt-8">
                加入社区
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 评价：两条媒体引言，唯一的引言区块 */}
      <section className="container-page py-16 md:py-20">
        <RevealGroup className="grid gap-8 sm:grid-cols-2 sm:gap-12">
          {pressQuotes.map((item) => (
            <figure key={item.source} className="sm:border-l sm:border-line sm:pl-8">
              <blockquote className="text-xl leading-snug tracking-tight text-ink md:text-2xl">
                「{item.quote}」
              </blockquote>
              <figcaption className="mt-4 text-sm text-ink-3">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline hover:text-ink"
                >
                  {item.source}
                </a>
              </figcaption>
            </figure>
          ))}
        </RevealGroup>
      </section>
    </>
  )
}
