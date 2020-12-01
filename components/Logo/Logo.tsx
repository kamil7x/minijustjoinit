import { Text } from '@fluentui/react';

import styles from './Logo.module.scss';

export const Logo = () => (
  <div className={styles.logo}>
    <Text variant="xxLarge" className={styles.mainText}>
      Just Join IT
    </Text>
      <Text variant="xSmall" className={styles.smallText}>
          Mini
      </Text>
  </div>
);
