import { Fabric } from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';
import { AppProps } from 'next/app';

import '../styles/globals.css';
initializeIcons();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fabric>
      <Component {...pageProps} />
    </Fabric>
  );
}
