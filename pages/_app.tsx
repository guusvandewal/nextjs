import { AppProps } from "next/app"

import "styles/_globals.scss"
import "styles/fonts.scss"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
