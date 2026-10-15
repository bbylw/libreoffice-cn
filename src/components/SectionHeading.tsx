import type { ReactNode } from 'react'

/**
 * 区块标题。默认竖排：眉标(可选)、标题、说明。
 * 刻意不做左标题加右侧说明的并排写法。
 */
export function SectionHeading({
  eyebrow,
  title,
  body,
  id,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  body?: ReactNode
  id?: string
  className?: string
}) {
  return (
    <div className={`max-w-[62ch] ${className}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {body ? <p className="mt-4 text-base text-ink-2 md:text-[17px]">{body}</p> : null}
    </div>
  )
}
