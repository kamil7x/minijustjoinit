import { Fabric } from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';
import { AppProps } from 'next/app';

import { wrapper } from '../store';

import '../styles/globals.css';

initializeIcons();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fabric>
      <Component {...pageProps} />
    </Fabric>
  );
}

export default wrapper.withRedux(MyApp);
