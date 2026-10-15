import { Link } from '@tanstack/react-router'
import { ButtonLink } from './ButtonLink'

export function NotFound({ children }: { children?: unknown }) {
  return (
    <div className="container-page flex min-h-[60dvh] flex-col items-start justify-center py-20">
      <p className="font-mono text-sm tracking-[0.16em] text-ink-3">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        这个页面不存在
      </h1>
      <p className="mt-4 max-w-[52ch] text-base text-ink-2">
        {typeof children === 'string'
          ? children
          : '你访问的地址没有对应的内容，可能是链接已经变更。可以回到首页，或直接前往下载页。'}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/">返回首页</ButtonLink>
        <ButtonLink to="/download" variant="secondary">
          前往下载
        </ButtonLink>
      </div>
      <Link
        to="/community"
        className="mt-6 text-sm text-ink-3 link-underline hover:text-ink"
      >
        找不到想要的资料，去社区求助
      </Link>
    </div>
  )
}
