import { Fabric } from '@fluentui/react';
import { AppProps } from 'next/app';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fabric>
      <Component {...pageProps} />
    </Fabric>
  );
}
