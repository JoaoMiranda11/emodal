import '../styles/globals.css'
import type { AppProps } from 'next/app'
import EModalProvider from './EModal/Provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EModalProvider>
      <Component {...pageProps} />
    </EModalProvider>
  )
}

export default MyApp
