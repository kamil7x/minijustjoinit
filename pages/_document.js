import * as React from 'react';

import { InjectionMode, Stylesheet } from '@uifabric/merge-styles';
import { resetIds } from '@uifabric/utilities';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const stylesheet = Stylesheet.getInstance();

stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: 'server',
});

export default class MyDocument extends Document {
  static displayName = 'Document';

  static getInitialProps({ renderPage }) {
    stylesheet.reset();
    resetIds();

    const page = renderPage((App) => (props) => <App {...props} />);

    return { ...page, styleTags: stylesheet.getRules(true) };
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: this.props.styleTags }}
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
