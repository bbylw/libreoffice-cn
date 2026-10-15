export type AreaId = 'design' | 'i18n' | 'marketing' | 'docs' | 'dev' | 'infra' | 'qa'

export interface ContributionArea {
  id: AreaId
  label: string
  summary: string
  href: string
}

export const contributionAreas: ContributionArea[] = [
  {
    id: 'design',
    label: '设计',
    summary: '图标、界面布局与交互方案。',
    href: 'https://wiki.documentfoundation.org/Special:MyLanguage/Design',
  },
  {
    id: 'i18n',
    label: '本地化',
    summary: '界面翻译、帮助文档与术语维护。',
    href: 'https://wiki.documentfoundation.org/Special:MyLanguage/Language',
  },
  {
    id: 'marketing',
    label: '营销',
    summary: '宣传材料、发布通稿与社区活动。',
    href: 'https://wiki.documentfoundation.org/Special:MyLanguage/Marketing',
  },
  {
    id: 'docs',
    label: '文档',
    summary: '帮助手册与模块 README 的改进。',
    href: 'https://wiki.documentfoundation.org/Special:MyLanguage/Documentation',
  },
  {
    id: 'dev',
    label: '开发',
    summary: 'C++ 代码、缺陷修复与新功能。',
    href: 'https://wiki.documentfoundation.org/Special:MyLanguage/Development',
  },
  {
    id: 'infra',
    label: '基础设施',
    summary: '构建系统、镜像站与发布流程。',
    href: 'https://wiki.documentfoundation.org/Category:Infrastructure',
  },
  {
    id: 'qa',
    label: '质量保证',
    summary: '测试用例、缺陷分类与回归验证。',
    href: 'https://wiki.documentfoundation.org/Special:MyLanguage/QA',
  },
]

export interface MemberQuote {
  name: string
  role: string
  quote: string
  photo: string
  width: number
  height: number
}

export const memberQuotes: MemberQuote[] = [
  {
    name: 'Kira Tubo',
    role: '社区开发者',
    quote: '一路走来学到非常多，也顺手积累了不少新技能。',
    photo: '/media/community_kira_tubo.jpg',
    width: 600,
    height: 580,
  },
  {
    name: 'Steven Casey',
    role: '社区开发者',
    quote: 'LibreOffice 的 wiki 非常出色，对刚上手分类 bug 的新手特别友好。',
    photo: '/media/community_steven_casey.jpg',
    width: 600,
    height: 580,
  },
]

export const pressQuotes = [
  {
    quote: '和 Microsoft Office 一样好，而且还完全免费。',
    source: 'ZDNET',
    href: 'https://www.zdnet.com/article/libreoffice-the-best-office-suite-gets-even-better-with-libreoffice-6-0/',
  },
  {
    quote: '确实出色。',
    source: 'TechRadar',
    href: 'https://www.techradar.com/reviews/libreoffice',
  },
]

export const socials = [
  { id: 'mastodon', label: 'Mastodon', href: 'https://fosstodon.org/@libreoffice', icon: '/media/social-mastodon.svg' },
  { id: 'bluesky', label: 'Bluesky', href: 'https://bsky.app/profile/libreoffice.bsky.social', icon: '/media/social-bluesky.svg' },
  { id: 'reddit', label: 'Reddit', href: 'https://www.reddit.com/r/libreoffice/', icon: '/media/social-reddit.svg' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/c/LibreOfficeTheDocumentFoundation', icon: '/media/social-youtube.svg' },
]

export const mentor = {
  name: 'Ilmari Lauhakangas',
  role: 'TDF 导师',
  email: 'ilmari.lauhakangas@libreoffice.org',
}

export const eventsLink = {
  label: '社区活动日历',
  href: 'https://wiki.documentfoundation.org/Events',
}
