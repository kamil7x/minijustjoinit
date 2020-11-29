import { Stack } from '@fluentui/react';

import { Header } from '../Header/Header';

import styles from './Layout.module.scss';

export const Layout: React.FC = ({ children }) => (
  <Stack className={styles.layout}>
    <Header />
    {children}
  </Stack>
);
