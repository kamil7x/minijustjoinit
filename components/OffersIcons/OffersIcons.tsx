import { IStackTokens, Icon, Stack } from '@fluentui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { sizing } from '../../theme/theme';

import styles from '../Header/Header.module.scss';

const stackTokens: IStackTokens = {
  childrenGap: sizing(2),
};

export const OffersIcons = () => {
  const router = useRouter();
  const { route } = router;

  return (
    <Stack
      horizontal
      verticalAlign="center"
      tokens={stackTokens}
      className={styles.icons}
    >
      {route !== '/' && (
        <Link href="/">
          <a title="Pokaż listę ofert">
            <Icon iconName="AppIconDefaultList" />
          </a>
        </Link>
      )}
      {route !== '/map' && (
        <Link href="/map">
          <a title="Pokaż mapę ofert">
            <Icon iconName="MapPinSolid" />
          </a>
        </Link>
      )}
    </Stack>
  );
};
