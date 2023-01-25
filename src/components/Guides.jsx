import { Button } from './Button'
import { Heading } from './Heading'
import Image from 'next/image'
import softwareBlack from '../images/softwareBlack.png'
import discordBlack from '../images/discordBlack.png'
import templateBlack from '../images/templateBlack.png'

const guides = [
  {
    href: '/software-intro',
    name: 'Software',
    description: 'Sell access to your web app or downloadable software through Whop’s powerful API.',
    image: softwareBlack,
  },
  {
    href: '/discord-intro',
    name: 'Discord',
    description: 'Sell access to your Discord community through Whop’s direct Discord integration.',
    image: discordBlack,
  },
  {
    href: '/templates-intro',
    name: 'Templates',
    description:
      'Sell access to your templates and make digital fulfilment and distribution easy.',
    image: templateBlack,
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="official-libraries">
        Guides
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3">
        {guides.map((guide) => (
          <div key={guide.name} className="flex flex-row-reverse gap-6">
            <div className="flex-auto">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {guide.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {guide.description}
              </p>
              <p className="mt-4">
                <Button href={guide.href} variant="text" arrow="right" className='text-[#fc8f79] hover:text-[#fc8f79] dark:text-[#fc8f79] dark:hover:text-[#fc8f79]'>
                  Learn more
                </Button>
              </p>
            </div>
            <Image
              src={guide.image}
              alt="Guide Category Icon"
              className="h-10 w-auto"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  )
}
