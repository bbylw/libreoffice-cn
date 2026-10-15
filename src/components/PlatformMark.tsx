import type { PlatformId } from '~/data/downloads'

/**
 * 平台徽标：手绘单色 SVG，随 currentColor 适配深浅主题。
 * Tux 的肚皮与眼睛用 fill-surface 挖空，与卡片徽标的 bg-surface 底色呼应。
 */
export function PlatformMark({
  platform,
  className,
}: {
  platform: PlatformId
  className?: string
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      {platform === 'windows' && (
        <>
          <path d="M3 5.7 10.3 4.5v7H3z" />
          <path d="M11.4 4.3 21 2.7v8.7h-9.6z" />
          <path d="M3 12.6h7.3v7L3 18.3z" />
          <path d="M11.4 12.6H21v8.7l-9.6-1.6z" />
        </>
      )}
      {platform === 'macos' && (
        <path d="M17.57 12.55c-.03-2.32 1.9-3.44 1.99-3.5-1.08-1.58-2.76-1.8-3.36-1.81-1.43-.15-2.8.85-3.52.85-.73 0-1.85-.83-3.03-.8-1.56.02-3 .9-3.8 2.3-1.62 2.8-.41 6.96 1.16 9.25.77 1.11 1.69 2.36 2.9 2.31 1.17-.05 1.61-.75 3.02-.75 1.4 0 1.81.75 3.04.73 1.26-.02 2.05-1.13 2.81-2.25.89-1.29 1.25-2.55 1.27-2.61-.03-.01-2.44-.93-2.47-3.71zM15.22 5.7c.64-.79 1.08-1.87.96-2.96-.93.04-2.05.62-2.71 1.4-.59.69-1.12 1.8-.97 2.87 1.03.08 2.08-.52 2.72-1.31z" />
      )}
      {platform === 'linux' && (
        <>
          {/* 鳍状肢：向两侧张开，撑出企鹅剪影 */}
          <ellipse cx="5.5" cy="14.2" rx="1.7" ry="3.9" transform="rotate(-18 5.5 14.2)" />
          <ellipse cx="18.5" cy="14.2" rx="1.7" ry="3.9" transform="rotate(18 18.5 14.2)" />
          {/* 脚：垫在身体下方，只露底部两截 */}
          <ellipse cx="9" cy="21.9" rx="2.9" ry="1.35" />
          <ellipse cx="15" cy="21.9" rx="2.9" ry="1.35" />
          {/* 头身合并为一个剪影：圆头 + 宽梨形身体 */}
          <circle cx="12" cy="7.3" r="4.3" />
          <ellipse cx="12" cy="15.4" rx="5.9" ry="6.3" />
          {/* 肚皮与眼白用底色挖空 */}
          <ellipse cx="12" cy="15.8" rx="3.6" ry="4.6" className="fill-surface" />
          <circle cx="10.15" cy="6.5" r="1.55" className="fill-surface" />
          <circle cx="13.85" cy="6.5" r="1.55" className="fill-surface" />
          <circle cx="10.35" cy="6.75" r="0.72" />
          <circle cx="14.05" cy="6.75" r="0.72" />
          {/* 喙：眼下方向下收的楔形，衔接肚皮 */}
          <path
            className="fill-surface"
            d="M12 8.5l1.55 1.9c.28.33.1.9-.34.9h-2.42c-.44 0-.62-.57-.34-.9z"
          />
        </>
      )}
    </svg>
  )
}
