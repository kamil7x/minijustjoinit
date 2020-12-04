import { IStackTokens, Stack, Text } from '@fluentui/react';

import { sizing } from '../../theme/theme';

import styles from './Section.module.scss';

interface SectionProps {
  title?: string;
  extras?: React.ReactElement;
}

const headerTokens: IStackTokens = {
  childrenGap: sizing(3),
};

export const Section: React.FC<SectionProps> = ({
  title,
  extras,
  children,
}) => (
  <Stack>
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      tokens={headerTokens}
      wrap
    >
      <Stack.Item>
        <Text variant="xLarge">{title}</Text>
      </Stack.Item>
      <Stack.Item className={styles.extras}>
        {extras}
      </Stack.Item>
    </Stack>
    <Stack className={styles.sectionContent}>{children}</Stack>
  </Stack>
);
