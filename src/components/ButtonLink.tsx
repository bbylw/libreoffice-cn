import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

type Variant = 'primary' | 'secondary'

const base =
  'inline-flex h-11 items-center justify-center gap-2 rounded-control px-5 text-[15px] font-medium transition-all active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-bg text-brand-fg hover:opacity-95',
  secondary:
    'border border-line bg-surface text-ink hover:border-brand/50 hover:bg-surface-2',
}

interface CommonProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

/**
 * 全站按钮样式只有一个来源，保证圆角、对比度与按压反馈一致。
 * primary 用品牌深绿底白字，对比度 6.7:1; secondary 用描边避免透明底上的低对比问题。
 */
export function ButtonLink({
  to,
  href,
  children,
  variant = 'primary',
  className = '',
}: CommonProps & { to?: string; href?: string }) {
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link to={to ?? '/'} className={cls}>
      {children}
    </Link>
  )
}
