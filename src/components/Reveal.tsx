import { motion, useReducedMotion } from 'motion/react'
import { Children, isValidElement, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** 进入视口的延迟秒数，用于列表错峰 */
  delay?: number
  y?: number
  className?: string
  /** mount: 首屏挂载即播放；view: 滚动进入视口时播放 */
  mode?: 'mount' | 'view'
  amount?: number
  /** 容器元素。列表项传 li，避免 ul > div > li 的非法嵌套 */
  as?: 'div' | 'li'
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * 入场动效封装。尊重 prefers-reduced-motion: 关闭动效时直接渲染静态内容。
 * 只动 transform 与 opacity, 不触发布局重排。
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  mode = 'view',
  amount = 0.2,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion()
  const Motion = as === 'li' ? motion.li : motion.div
  const hidden = { opacity: 0, y }
  const shown = { opacity: 1, y: 0 }
  const transition = { duration: 0.6, delay, ease: EASE }

  if (mode === 'mount') {
    return (
      <Motion
        className={className}
        initial={reduce ? false : hidden}
        animate={shown}
        transition={transition}
      >
        {children}
      </Motion>
    )
  }

  return (
    <Motion
      className={className}
      initial={reduce ? false : hidden}
      whileInView={shown}
      viewport={{ once: true, amount }}
      transition={transition}
    >
      {children}
    </Motion>
  )
}

export function RevealGroup({
  children,
  className,
  step = 0.07,
  amount = 0.15,
}: {
  children: ReactNode
  className?: string
  step?: number
  amount?: number
}) {
  const reduce = useReducedMotion()
  const hidden = { opacity: 0, y: 16 }
  const shown = { opacity: 1, y: 0 }
  // Children.toArray 会保留（并规范化）每个子元素的 key，
  // 外层 motion.div 沿用该 key，避免调用方 key 丢失。
  const items = Children.toArray(children)

  return (
    <div className={className}>
      {items.map((child, i) => (
        <motion.div
          key={isValidElement(child) && child.key != null ? child.key : i}
          initial={reduce ? false : hidden}
          whileInView={shown}
          viewport={{ once: true, amount }}
          transition={{ duration: 0.55, delay: i * step, ease: EASE }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
