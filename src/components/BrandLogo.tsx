/**
 * 品牌标志。深色模式使用单独一份 SVG：原文件的「Office」与副标题是黑色描边，
 * 在深色背景上几乎不可见，所以这里为深色主题准备了一份改成浅色的副本。
 */
export function BrandLogo({ height = 22, className = '' }: { height?: number; className?: string }) {
  const width = Math.round(height * 5.04)
  const shared = `w-auto ${className}`

  return (
    <>
      <img
        src="/media/libreoffice-tdf-logo.svg"
        alt="LibreOffice"
        width={width}
        height={height}
        style={{ height: `${height}px` }}
        className={`${shared} dark:hidden`}
      />
      <img
        src="/media/libreoffice-tdf-logo-dark.svg"
        alt="LibreOffice"
        width={width}
        height={height}
        style={{ height: `${height}px` }}
        className={`${shared} hidden dark:block`}
      />
    </>
  )
}
