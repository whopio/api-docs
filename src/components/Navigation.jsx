import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { Button } from './Button'
import { useIsInsideMobileNavigation } from './MobileNavigation'
import { useSectionStore } from './SectionProvider'
import { Tag } from './Tag'
import { remToPx } from '../lib/remToPx'

function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({ href, children }) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({ href, tag, active, isAnchorLink = false, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </Link>
  )
}

function VisibleSectionHighlight({ group, pathname }) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation()
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0]
    )
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-[#FF6423]" /* Whop color */
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({ group, className }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [router, sections] = useInitialValue(
    [useRouter(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation
  )

  let isActiveGroup =
    group.links.findIndex((link) => link.href === router.pathname) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={router.pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={router.pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === router.pathname}>
                {link.title} {link.icon}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {link.href === router.pathname && sections.length > 0 && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          isAnchorLink
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export const navigation = [
  {
    title: 'Getting Started',
    links: [
      { title: 'What is Whop?', href: '/' },
      { title: 'Fees', href: '/fees' },
      { title: 'Creating your company', href: '/creating-company' },
    ],
  },
  {
    title: 'Payments',
    links: [
      { title: 'Getting paid', href: '/getting-paid' },
      { title: 'Merchant of Record', href: '/merchant-of-record' },
      { title: 'Sales tax & VAT', href: '/tax' },
      { title: 'Crypto payments', href: '/crypto' },
      { title: 'Disputes', href: '/disputes' },
      { title: 'Notifications', href: '/notifications' },
      { title: 'Payment FAQ', href: '/payment-faq' },
    ],
  },
  {
    title: 'Migrating',
    links: [
      { title: 'Migrating from Gumroad', href: '/gumroad' },
      { title: 'Migrating from Launchpass', href: '/launchpass' },
    ],
  },
  {
    title: 'Features',
    links: [
      { title: 'Affiliates', href: '/affiliates' },
      { title: 'Promo Codes', href: '/promo-codes' },
      { title: 'User Feedback', href: '/reviews' },
      { title: 'Checkout Links', href: '/checkout-links' },
      { title: 'Waitlist', href: '/waitlist' },
      { title: 'Raffles', href: '/raffles' },
      { title: 'Team Members', href: '/team' },
      { title: 'Quick actions', href: '/actions' },
    ],
  },
  {
    title: 'Branding',
    links: [
      { title: 'Website Customization', href: '/hosted' },
      { title: 'Embeds', href: '/embeds' },
      { title: 'Graphic Design / VFX Services', href: '/graphic' },
    ],
  },
  {
    title: 'Software',
    links: [
      { title: 'Getting Started', href: '/software-intro' },
      { title: 'Webhooks', href: '/webhook' },
      { title: 'License Key Integration', href: '/license-key' },
      { title: 'Templates', href: '/software-templates' },
      { title: 'Software FAQ', href: '/software-faq' },
      { title: 'TypeScript SDK', href: '/ts-sdk' },
      {
        title: 'API Reference',
        href: 'https://dev.whop.com',
        icon: <i class="fa-solid fa-arrow-up-right-from-square"></i>,
      },
    ],
  },
  {
    title: 'Discord Communities',
    links: [{ title: 'Start selling', href: '/discord-intro' }],
  },
  {
    title: 'Telegram Channels',
    links: [{ title: 'Start selling', href: '/telegram' }],
  },
  {
    title: 'Templates',
    links: [{ title: 'Start selling', href: '/templates-intro' }],
  },
  {
    title: 'Marketplace',
    links: [
      { title: 'Getting listed', href: '/listed' },
      { title: 'Algorithm', href: '/algorithm' },
    ],
  },
  {
    title: 'Tokengating',
    links: [{ title: 'Getting started', href: '/tokengating-intro' }],
  },
]

export function Navigation(props) {
  return (
    <nav {...props}>
      <ul role="list">
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 && 'md:mt-0'}
          />
        ))}
      </ul>
    </nav>
  )
}
