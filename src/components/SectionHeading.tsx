import type { ReactNode } from 'react'

/**
 * 区块标题。默认竖排：标题、说明。
 * 刻意不做左标题加右侧说明的并排写法。
 * 眉标只出现在页首 hero，不属于区块标题：需要时调用方自行渲染 <p className="eyebrow">。
 */
export function SectionHeading({
  title,
  body,
  id,
  className = '',
}: {
  title: ReactNode
  body?: ReactNode
  id?: string
  className?: string
}) {
  return (
    <div className={`max-w-[62ch] ${className}`}>
      <h2 id={id} className="mt-3 scroll-mt-24 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {body ? <p className="mt-4 text-base text-ink-2 md:text-[17px]">{body}</p> : null}
    </div>
  )
}
