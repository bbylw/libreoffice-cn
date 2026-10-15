export const seo = ({
  title,
  description,
}: {
  title: string
  description: string
}) => [
  { title },
  { name: 'description', content: description },
  { name: 'keywords', content: 'LibreOffice, 开源办公软件，免费办公套件，Writer, Calc, Impress, 中文' },
  { property: 'og:type', content: 'website' },
  { property: 'og:locale', content: 'zh_CN' },
  { property: 'og:site_name', content: 'LibreOffice 中文站' },
  { name: 'og:title', content: title },
  { name: 'og:description', content: description },
  { name: 'twitter:card', content: 'summary' },
  { name: 'twitter:title', content: title },
  { name: 'twitter:description', content: description },
]
