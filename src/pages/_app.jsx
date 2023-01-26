import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import { Script } from 'next/script'
import { Layout } from '../components/Layout'
import * as mdxComponents from '../components/mdx'
import { useMobileNavigationStore } from '../components/MobileNavigation'

import '../styles/tailwind.css'
import 'focus-visible'

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

export default function App({ Component, pageProps }) {
  let router = useRouter()

  return (
    <>
      <Head>
        {router.pathname === '/' ? (
          <title>Whop Docs</title>
        ) : (
          <title>{`${pageProps.title} - Whop Docs`}</title>
        )}
        <meta name="description" content="This documentation is intended to give you an overview of Whop’s business features, our dashboards flexibility, and provide tips for how to use Whop to streamline your businesses reach, fulfillment, workflow and growth." />
        <meta property="og:image" content={pageProps.image || 'https://i.imgur.com/mcMNF2o.jpg'} />
      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </>
  )
}
