import { Link } from '@tanstack/react-router'
import { socials } from '~/data/community'
import { BrandLogo } from './BrandLogo'

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: '下载',
    links: [
      { label: '官方下载页（简体中文）', href: 'https://zh-cn.libreoffice.org/download/libreoffice/' },
      { label: '官方下载页（繁体中文）', href: 'https://zh-tw.libreoffice.org/下載/' },
      { label: '国内镜像', href: 'https://mirrors.cloud.tencent.com/libreoffice/libreoffice/stable/' },
      { label: '发行注记', href: 'https://zh-cn.libreoffice.org/download/release-notes/' },
      { label: '旧版本归档', href: 'https://downloadarchive.documentfoundation.org/libreoffice/old/' },
      { label: '扩展与模板', href: 'https://zh-cn.libreoffice.org/discover/templates-and-extensions/' },
    ],
  },
  {
    title: '关于',
    links: [
      { label: '我们是谁', href: 'https://www.libreoffice.org/who-are-we/' },
      { label: '文档基金会 TDF', href: 'https://www.documentfoundation.org/' },
      { label: '谁在使用 LibreOffice', href: 'https://www.libreoffice.org/who-uses-libreoffice/' },
      { label: 'LibreOffice 技术', href: 'https://www.libreoffice.org/libreoffice-technology/' },
      { label: '什么是 OpenDocument', href: 'https://wiki.documentfoundation.org/ODF' },
    ],
  },
  {
    title: '帮助',
    links: [
      { label: '常见问题', href: 'https://www.libreoffice.org/faq/' },
      { label: '社区援助', href: 'https://www.libreoffice.org/get-help/' },
      { label: '官方手册', href: 'https://books.libreoffice.org/' },
      { label: '安装说明', href: 'https://www.libreoffice.org/installation-instructions/' },
      { label: '系统要求', href: 'https://www.libreoffice.org/system-requirements/' },
    ],
  },
  {
    title: '参与',
    links: [
      { label: '从这里开始', href: 'https://www.libreoffice.org/improve-it/' },
      { label: '社区活动', href: 'https://wiki.documentfoundation.org/Events' },
      { label: '代码仓库', href: 'https://github.com/LibreOffice/core' },
      { label: '模块文档索引', href: 'https://docs.libreoffice.org/' },
      { label: '官方博客', href: 'https://blog.documentfoundation.org/' },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
          <div>
            <BrandLogo height={24} />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink-3">
              一套由全球社区共同维护的开源办公套件，兼容绝大多数文档格式与标准。
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex size-9 items-center justify-center rounded-control border border-line bg-bg transition-colors hover:border-brand/50 active:scale-[0.97]"
                >
                  <img src={s.icon} alt="" width={16} height={16} className="size-4 dark:brightness-0 dark:invert" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-ink-2 transition-colors hover:text-brand-ink dark:hover:text-brand"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs leading-relaxed text-ink-3 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[62ch]">
            本站为中文整理站点，内容依据 libreoffice.org 与 LibreOffice/core
            文档整理，采用知识共享 署名相同方式共享
            3.0 许可。LibreOffice 源代码以 Mozilla
            公共许可证 2.0 授权。下载文件均来自 The Document Foundation 官方镜像。
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <Link to="/download" className="transition-colors hover:text-ink">
              下载
            </Link>
            <Link to="/develop" className="transition-colors hover:text-ink">
              开发者
            </Link>
            <Link to="/community" className="transition-colors hover:text-ink">
              社区
            </Link>
            <span className="font-mono">{year}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
