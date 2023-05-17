import '@/styles/globals.css'
import "@finos/perspective-viewer/dist/css/themes.css";

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
