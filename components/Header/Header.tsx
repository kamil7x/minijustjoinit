import { IStackStyles, IStackTokens, Stack } from '@fluentui/react';

import { palette, sizing } from '../../theme/theme';

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
    <Stack.Item>LOGO</Stack.Item>
    <Stack.Item>Filters</Stack.Item>
  </Stack>
);
