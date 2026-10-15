import { MoonStarsIcon, SunIcon } from '@phosphor-icons/react'

const STORAGE_KEY = 'lo-theme'

/**
 * 主题切换。图标由 <html data-theme> 的 CSS 决定，因此服务端渲染与客户端一致,
 * 不需要挂载后再改一次 DOM。首屏防闪烁由 __root 中的内联脚本负责。
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
    root.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // 隐私模式下写入失败时忽略，切换本身仍然生效
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="切换深色与浅色主题"
      title="切换深色与浅色主题"
      className="inline-flex size-10 items-center justify-center rounded-control border border-line bg-surface text-ink-2 transition-colors hover:text-ink active:scale-[0.97] dark:bg-surface"
    >
      <SunIcon size={18} weight="bold" className="hidden dark:block" />
      <MoonStarsIcon size={18} weight="bold" className="block dark:hidden" />
    </button>
  )
}
