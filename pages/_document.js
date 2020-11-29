import * as React from 'react';

import { InjectionMode, Stylesheet } from '@uifabric/merge-styles';
import { resetIds } from '@uifabric/utilities';
import Document, { Head, Main, NextScript } from 'next/document';

const stylesheet = Stylesheet.getInstance();

stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: 'server',
});

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    stylesheet.reset();
    resetIds();

    const page = renderPage((App) => (props) => <App {...props} />);

    return { ...page, styleTags: stylesheet.getRules(true) };
  }

  render() {
    return (
      <html>
        <Head>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: this.props.styleTags }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
