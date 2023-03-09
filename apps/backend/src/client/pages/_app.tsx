import {useState} from 'react'
import type {AppProps} from 'next/app'
import {QueryClient, QueryClientProvider, Hydrate} from 'react-query'

import '../styles/globals.css'

export default function App({Component, pageProps}: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}
