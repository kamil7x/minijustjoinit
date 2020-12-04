import { IStackTokens, Icon, Stack, Text } from '@fluentui/react';
import { IFontStyles } from 'office-ui-fabric-react/lib/Styling';

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
