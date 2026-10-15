export interface AppEntry {
  id: string
  name: string
  en: string
  summary: string
  image: string
  width: number
  height: number
  icon: string
  guideUrl: string
  formats: string
}

/** 六款应用，说明文字依据 libreoffice.org 首页与官方指南整理。 */
export const apps: AppEntry[] = [
  {
    id: 'writer',
    name: '文字处理',
    en: 'Writer',
    summary: '从速记草稿到完整书稿都能胜任的文档编辑器，样式与目录管理是它的强项。',
    image: '/media/screenshot_writer.png',
    width: 1024,
    height: 768,
    icon: '/media/libo-writer.svg',
    guideUrl: 'https://books.libreoffice.org/',
    formats: 'ODF, DOCX, RTF, ODT, EPUB',
  },
  {
    id: 'calc',
    name: '电子表格',
    en: 'Calc',
    summary: '分析数据、批量计算并生成清晰图表，内置函数覆盖常用统计与财务场景。',
    image: '/media/screenshot_calc.png',
    width: 1024,
    height: 768,
    icon: '/media/libo-calc.svg',
    guideUrl: 'https://books.libreoffice.org/',
    formats: 'ODS, XLSX, CSV, HTML',
  },
  {
    id: 'impress',
    name: '演示文稿',
    en: 'Impress',
    summary: '快速搭建图文与多媒体演示，支持母版、动画与投影时的多屏输出。',
    image: '/media/screenshot_impress.png',
    width: 1024,
    height: 720,
    icon: '/media/libo-impress.svg',
    guideUrl: 'https://books.libreoffice.org/',
    formats: 'ODP, PPTX, PDF',
  },
  {
    id: 'draw',
    name: '绘图',
    en: 'Draw',
    summary: '从简单示意图到复杂三维插图都能绘制，也可直接编辑 SVG 图形文件。',
    image: '/media/screenshot_draw.png',
    width: 1024,
    height: 768,
    icon: '/media/libo-draw.svg',
    guideUrl: 'https://books.libreoffice.org/',
    formats: 'ODG, SVG, PNG, PDF',
  },
  {
    id: 'math',
    name: '公式',
    en: 'Math',
    summary: '用可视化编辑器或纯文本语法书写数学公式，可嵌入文档随排版一起缩放。',
    image: '/media/screenshot_math.png',
    width: 1024,
    height: 768,
    icon: '/media/libo-math.svg',
    guideUrl: 'https://books.libreoffice.org/',
    formats: 'ODF Math, MathML, LaTeX',
  },
  {
    id: 'base',
    name: '数据库',
    en: 'Base',
    summary: '直接管理数据库：建表、表单、查询与报表都在同一个界面里完成。',
    image: '/media/screenshot_base.png',
    width: 1024,
    height: 768,
    icon: '/media/libo-base.svg',
    guideUrl: 'https://books.libreoffice.org/',
    formats: 'ODB, SQLite, Firebird, PostgreSQL',
  },
]
