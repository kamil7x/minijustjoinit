import { IStackStyles, IStackTokens, Stack } from '@fluentui/react';
import Link from 'next/link';

import { palette, sizing } from '../../theme/theme';
import { Logo } from '../Logo/Logo';

import styles from './Header.module.scss';

const stackTokens: IStackTokens = {
  padding: sizing(3),
};

export const Header: React.FC = () => (
  <Stack
    horizontal
    horizontalAlign="space-between"
    verticalAlign="center"
    tokens={stackTokens}
    className={styles.header}
  >
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>
    <Stack.Item>Filters</Stack.Item>
  </Stack>
);
