import { IStackTokens, Icon, Stack } from '@fluentui/react';
import Link from 'next/link';

import { sizing } from '../../theme/theme';
import { Logo } from '../Logo/Logo';
import { OffersIcons } from '../OffersIcons/OffersIcons';

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
    <OffersIcons />
  </Stack>
);
