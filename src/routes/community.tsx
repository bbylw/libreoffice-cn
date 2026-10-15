import { createFileRoute } from '@tanstack/react-router'
import {
  BookOpenTextIcon,
  CheckCircleIcon,
  CodeIcon,
  HardDrivesIcon,
  MegaphoneIcon,
  PaletteIcon,
  TranslateIcon,
} from '@phosphor-icons/react'
import { Reveal } from '~/components/Reveal'
import { SectionHeading } from '~/components/SectionHeading'
import { ButtonLink } from '~/components/ButtonLink'
import {
  contributionAreas,
  eventsLink,
  memberQuotes,
  mentor,
  socials,
  type AreaId,
} from '~/data/community'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/community')({
  head: () => ({
    meta: seo({
      title: '加入 LibreOffice 社区 | 贡献方式与联系方式',
      description:
        '设计、本地化、营销、文档、开发、基础设施与质量保证，七个方向都可以参与。附社区活动与官方账号。',
    }),
  }),
  component: CommunityPage,
})

/** 每个贡献方向配一个同族图标，键与 ContributionArea.id 同源，漂移会在类型层暴露。 */
const areaIcons: Record<AreaId, typeof PaletteIcon> = {
  design: PaletteIcon,
  i18n: TranslateIcon,
  marketing: MegaphoneIcon,
  docs: BookOpenTextIcon,
  dev: CodeIcon,
  infra: HardDrivesIcon,
  qa: CheckCircleIcon,
}

function CommunityPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-14 md:py-20">
          <Reveal mode="mount">
            <p className="eyebrow">参与方式</p>
          </Reveal>
          <Reveal mode="mount" delay={0.06}>
            <h1 className="mt-4 max-w-[16ch] text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-ink md:text-5xl">
              欢迎加入 LibreOffice
            </h1>
          </Reveal>
          <Reveal mode="mount" delay={0.12}>
            <p className="mt-5 max-w-[54ch] text-base text-ink-2 md:text-[17px]">
              LibreOffice 由一个友好的社区开发，社区里有来自世界各地的数百名贡献者。软件免费且开源，任何人都可以研究它的运作方式，并提交改进。
            </p>
          </Reveal>
          <Reveal mode="mount" delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="https://www.libreoffice.org/improve-it/">
                从这里开始
              </ButtonLink>
              <ButtonLink to="/develop" variant="secondary">
                先看开发者指南
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <Reveal>
          <SectionHeading
            title="开始之前"
            body="第一次参与的人，建议先约一次入门面谈，熟悉贡献流程和沟通方式，效率会高很多。"
          />
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-8 max-w-[62ch] rounded-card border border-line bg-surface p-6 md:p-7">
            <p className="text-[15px] leading-relaxed text-ink-2">
              在提交第一个补丁之前，建议先和 TDF 导师{' '}
              <a
                href={`mailto:${mentor.email}`}
                className="font-medium text-ink link-underline"
              >
                {mentor.name}
              </a>{' '}
              约一次入门面谈（orienting interview），把方向和切入点先聊清楚。
            </p>
            <p className="mt-4 font-mono text-sm text-ink-3">{mentor.email}</p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-20 md:py-24">
          <Reveal>
            <SectionHeading
              title="七个可以参与的方向"
              body="写代码只是其中一种。每个方向都有对应的 wiki 页面说明现在缺什么。"
            />
          </Reveal>

          <ul className="mt-10 grid gap-x-12 gap-y-1 sm:grid-cols-2">
            {contributionAreas.map((area, index) => {
              const Icon = areaIcons[area.id] ?? CodeIcon
              // 7 个方向放进 2 列时，最后一项跨满整行，避免出现空格子
              const orphan =
                index === contributionAreas.length - 1 && contributionAreas.length % 2 === 1

              return (
                <Reveal
                  key={area.id}
                  delay={index * 0.04}
                  className={orphan ? 'sm:col-span-2' : ''}
                >
                  <li className="border-b border-line">
                    <a
                      href={area.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-start gap-4 py-5"
                    >
                      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-control border border-line bg-bg text-ink-2 transition-colors group-hover:border-brand/50 group-hover:text-brand-ink dark:group-hover:text-brand">
                        <Icon size={19} weight="bold" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-base font-medium text-ink">
                          {area.label}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-ink-2">
                          {area.summary}
                        </span>
                      </span>
                    </a>
                  </li>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="container-page py-20 md:py-24">
        <Reveal>
          <figure>
            <img
              src="/media/community_conference_photo.jpg"
              alt="LibreOffice 社区年度线下聚会现场"
              width={600}
              height={580}
              loading="lazy"
              decoding="async"
              className="aspect-[21/9] w-full rounded-card border border-line object-cover"
            />
          </figure>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                线下见面与其他活动
              </h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">
                每年都有社区会议，以及各类线上线下活动，用来讨论议题、做工作坊和认识新朋友。
              </p>
              <a
                href={eventsLink.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 text-sm text-ink-2 transition-colors hover:text-brand-ink dark:hover:text-brand link-underline"
              >
                {eventsLink.label}
              </a>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {memberQuotes.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.07}>
                <figure className="h-full rounded-card border border-line bg-surface p-6">
                  <img
                    src={member.photo}
                    alt={`${member.name} 的照片`}
                    width={member.width}
                    height={member.height}
                    loading="lazy"
                    decoding="async"
                    className="size-14 rounded-full border border-line object-cover"
                  />
                  <blockquote className="mt-4 text-[15px] leading-relaxed text-ink">
                    「{member.quote}」
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-ink-3">
                    {member.name}，{member.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface-2">
        <div className="container-page py-16 md:py-20">
          <Reveal>
            <SectionHeading title="关注官方账号" />
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 flex flex-wrap gap-4">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex size-14 items-center justify-center rounded-card border border-line bg-surface transition-colors hover:border-brand/50 active:scale-[0.98]"
                >
                  <img
                    src={social.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="size-[22px] dark:brightness-0 dark:invert"
                  />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
              <p className="max-w-[46ch] text-sm text-ink-2">
                已经是贡献者？欢迎以成员身份加入 The Document Foundation，参与治理与决策。
              </p>
              <ButtonLink
                href="https://www.documentfoundation.org/governance/why-be-a-member/"
                variant="secondary"
              >
                了解 TDF 成员
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
