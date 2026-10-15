export const seo = ({
  title,
  description,
  image = '/media/screenshot_writer_hero.png',
}: {
  title: string
  description: string
  image?: string
}) => [
  { title },
  { name: 'description', content: description },
  { name: 'keywords', content: 'LibreOffice, 开源办公软件，免费办公套件，Writer, Calc, Impress, 中文' },
  { property: 'og:type', content: 'website' },
  { property: 'og:locale', content: 'zh_CN' },
  { property: 'og:site_name', content: 'LibreOffice 中文站' },
  { property: 'og:title', content: title },
  { property: 'og:description', content: description },
  { property: 'og:image', content: image },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: title },
  { name: 'twitter:description', content: description },
  { name: 'twitter:image', content: image },
]
