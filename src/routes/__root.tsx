/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import appCss from '~/styles/app.css?url'

/**
 * 首屏防闪烁：在样式生效前决定 <html data-theme>。
 * 用户手动切换过的选择保存在 localStorage, 否则跟随系统。
 */
const themeBootstrap = `(function(){try{var s=localStorage.getItem('lo-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=(s==='light'||s==='dark')?s:m;}catch(e){document.documentElement.dataset.theme='light';}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'theme-color',
        content: '#f2f4f4',
        media: '(prefers-color-scheme: light)',
      },
      {
        name: 'theme-color',
        content: '#0c0f10',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
    scripts: [{ children: themeBootstrap }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" data-theme="light" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-[100dvh] bg-bg text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:h-auto focus:rounded-control focus:bg-brand-bg focus:px-4 focus:py-2 focus:text-sm focus:text-brand-fg"
        >
          跳到主要内容
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}
