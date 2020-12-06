import { IStackTokens, Icon, Stack, Text, IFontStyles } from '@fluentui/react';

import { sizing } from '../../theme/theme';

import styles from './Location.module.scss';

interface Props {
  parts?: string[];
  variant?: keyof IFontStyles;
}

const stackTokens: IStackTokens = {
  childrenGap: sizing(1),
};

export const Location = ({ parts = [], variant = 'small' }: Props) => (
  <Stack
    horizontal
    verticalAlign="center"
    className={styles.location}
    tokens={stackTokens}
    wrap
  >
    <Icon iconName="MapPin" />
    <Text variant={variant}>{parts.join(', ')}</Text>
  </Stack>
);
