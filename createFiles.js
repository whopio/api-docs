const fs = require('fs')

const navigation = [
  {
    title: 'Getting Started',
    links: [
      { title: 'What is Whop?', href: '/' },
      { title: 'Selling your product', href: '/selling' },
      { title: 'Fees', href: '/fees' },
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
      { title: 'Migrating from Paddle', href: '/paddle' },
    ],
  },
  {
    title: 'Product',
    links: [
      { title: 'Product Page', href: '/product' },
      { title: 'Affiliates', href: '/affiliates' },
      { title: 'Checkout Links', href: '/checkout-links' },
      { title: 'Reviews and user feedback', href: '/reviews' },
      { title: 'API', href: '/api' },
      { title: 'Quick actions', href: '/actions' },
      { title: 'Team Members', href: '/team' },
      { title: 'Email tools', href: '/email' },
      { title: 'Raffles', href: '/raffles' },
      { title: 'Promo Codes', href: '/promocodes' },
      { title: 'Welcome Message', href: '/welcome' },
    ],
  },
  {
    title: 'Branding',
    links: [
      { title: 'Use your own website', href: '/hosted' },
      { title: 'SEO', href: '/seo' },
      { title: 'Embeds', href: '/embeds' },
      { title: 'Graphic Design / VFX Services', href: '/graphic' },
    ],
  },
  {
    title: 'Software',
    links: [
      { title: 'Getting Started', href: '/software-intro' },
      { title: 'Webhook Integration', href: '/webhook' },
      { title: 'API Integration', href: '/software-api' },
      { title: 'Available templates to get you started', href: '/templates' },
      { title: 'Software FAQ', href: '/software-faq' },
    ],
  },
  {
    title: 'Discord Communities',
    links: [
      { title: 'Start selling', href: '/discord-intro' },
      { title: 'Discord FAQ', href: '/discord-faq' },
    ],
  },
  {
    title: 'Courses',
    links: [
      { title: 'Start selling', href: '/courses-intro' },
      { title: 'Courses FAQ', href: '/courses-faq' },
    ],
  },
  {
    title: 'Files',
    links: [
      { title: 'Start selling', href: '/files-intro' },
      { title: 'Files FAQ', href: '/files-faq' },
    ],
  },
  {
    title: 'Marketplace',
    links: [
      { title: 'Getting listed', href: '/listed' },
      { title: 'Algorithm', href: '/algorithm' },
      { title: 'Marketplace FAQ', href: '/marketplace-faq' },
    ],
  },
  {
    title: 'Integrations',
    links: [
      { title: 'Mailmodo', href: '/mailmodo' },
      { title: 'Push Notifications', href: '/notifications' },
      { title: 'Embeds', href: '/embeds' },
      { title: 'Graphic Design / VFX Services', href: '/graphic' },
    ],
  },
  {
    title: 'Additional Migrations',
    links: [
      { title: 'Migrating from a Custom Dashboard', href: '/custom' },
      { title: 'Migrating from a Patreon', href: '/patreon' },
      { title: 'Migrating from a UpgradeChat', href: '/upgradechat' },
      { title: 'Migrating from a Hyper', href: '/hyper' },
      { title: 'Migrating from a Payrole', href: '/payrole' },
      { title: 'Migrating from a Memberful', href: '/memberful' },
    ],
  },
  {
    title: 'Tokengating',
    links: [
      { title: 'Getting started', href: '/tokengating-intro' },
      { title: 'Tokengating FAQ', href: '/tokengating-faq' },
    ],
  },
  {
    title: 'Stats',
    links: [
      { title: 'MRR', href: '/mrr' },
      { title: 'Net revenue', href: '/net-revenue' },
    ],
  },
  {
    title: 'Storefront',
    links: [
      { title: 'Store front vs. product page', href: '/store-vs-product' },
      { title: 'Editing your store', href: '/editing' },
      { title: 'Embeds', href: '/embeds' },
      { title: 'Graphic Design / VFX Services', href: '/graphic' },
    ],
  },
]

navigation.forEach((section) => {
  for (let i = 0; i < section.links.length; i++) {
    fs.writeFile(
      './src/pages/' + section.links[i].href.split('/')[1] + '.mdx',
      '# Test page',
      function (err) {
        if (err) console.error(err)
        console.log(section.links[i].title, 'created successfully')
      }
    )
  }
})
