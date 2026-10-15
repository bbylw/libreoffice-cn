import type { MouseEvent, ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

type Variant = 'primary' | 'secondary'
type Size = 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 rounded-control font-medium transition-all active:scale-[0.98]'

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[15px]',
  sm: 'h-10 px-4 text-sm',
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-bg text-brand-fg shadow-[0_10px_24px_-12px_rgb(0_0_0/0.4)] hover:opacity-95',
  secondary:
    'border border-line bg-surface text-ink hover:border-brand/50 hover:bg-surface-2',
}

interface CommonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  onClick?: (e: MouseEvent) => void
}

type ButtonLinkProps = CommonProps &
  (
    | { to: string; href?: never }
    | { href: string; to?: never }
  )

/**
 * 全站按钮样式只有一个来源，保证圆角、对比度与按压反馈一致。
 * primary 用品牌深绿底白字，对比度 6.7:1；secondary 用描边避免透明底上的低对比问题。
 * to 与 href 互斥：传 to 走站内路由，传 href 走普通链接；两者都不传会在类型层报错，
 * 避免静默落到首页。
 */
export function ButtonLink({
  to,
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: ButtonLinkProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (href !== undefined) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={cls} onClick={onClick}>
      {children}
    </Link>
  )
}
