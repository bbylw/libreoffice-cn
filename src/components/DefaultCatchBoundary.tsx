import { Link, useLocation, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { WarningCircleIcon } from '@phosphor-icons/react'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useLocation({
    select: (location) => location.pathname === '/',
  })

  return (
    <div className="container-page flex min-w-0 flex-1 flex-col items-start justify-center gap-6 py-24">
      <WarningCircleIcon size={32} weight="bold" className="text-ink-3" />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          页面出错了
        </h1>
        <p className="mt-3 max-w-[52ch] text-base text-ink-2">
          加载这个页面时发生了错误。可以重试一次，或者先回到首页继续浏览。
        </p>
      </div>
      <pre className="max-w-full overflow-x-auto rounded-control border border-line bg-surface px-4 py-3 font-mono text-xs leading-relaxed text-ink-2">
        {error instanceof Error ? error.message : String(error)}
      </pre>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => router.invalidate()}
          className="inline-flex h-11 items-center rounded-control bg-brand-bg px-5 text-[15px] font-medium text-brand-fg transition-opacity hover:opacity-95 active:scale-[0.98]"
        >
          重试
        </button>
        {isRoot ? (
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-control border border-line bg-surface px-5 text-[15px] font-medium text-ink transition-colors hover:border-brand/50 active:scale-[0.98]"
          >
            返回首页
          </Link>
        ) : (
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-control border border-line bg-surface px-5 text-[15px] font-medium text-ink transition-colors hover:border-brand/50 active:scale-[0.98]"
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
          >
            返回上一页
          </Link>
        )}
      </div>
    </div>
  )
}
