import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ListIcon, XIcon } from '@phosphor-icons/react'
import { ThemeToggle } from './ThemeToggle'
import { BrandLogo } from './BrandLogo'
import { ButtonLink } from './ButtonLink'
import { primaryDownloadUrl } from '~/data/downloads'

const navItems = [
  { to: '/', label: '首页' },
  { to: '/download', label: '下载' },
  { to: '/develop', label: '开发者' },
  { to: '/community', label: '社区' },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/88 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[68px]">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="LibreOffice 中文站首页"
          onClick={() => setOpen(false)}
        >
          <BrandLogo height={22} />
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === '/' }}
              className="rounded-control px-3 py-2 text-[15px] text-ink-2 transition-colors hover:text-ink"
              activeProps={{ className: 'font-medium text-ink' }}
            >
              {({ isActive }) => (
                <span className="relative inline-block">
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-brand transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href={primaryDownloadUrl} size="sm" className="hidden md:inline-flex">
            免费下载
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            className="inline-flex size-10 items-center justify-center rounded-control border border-line bg-surface text-ink transition-colors hover:text-ink active:scale-[0.97] md:hidden"
          >
            {open ? <XIcon size={18} weight="bold" /> : <ListIcon size={18} weight="bold" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-surface md:hidden">
          <nav aria-label="移动端导航" className="container-page flex flex-col py-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === '/' }}
                onClick={() => setOpen(false)}
                className="rounded-control px-2 py-3 text-base text-ink-2"
                activeProps={{ className: 'font-medium text-ink' }}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href={primaryDownloadUrl}
              size="sm"
              className="mt-3 w-full"
              onClick={() => setOpen(false)}
            >
              免费下载
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
