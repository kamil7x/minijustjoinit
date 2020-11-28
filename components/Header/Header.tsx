import { IStackStyles, IStackTokens, Stack } from '@fluentui/react';

import { sizing } from '../../theme/theme';

const stackTokens: IStackTokens = {
  padding: sizing(3),
};

const stackStyles: IStackStyles = {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: sizing(10),
    borderBottom: '1px solid lightgrey',
  },
};

export const Header: React.FC = () => (
  <Stack
    horizontal
    horizontalAlign="space-between"
    verticalAlign="center"
    tokens={stackTokens}
    styles={stackStyles}
  >
    <Stack.Item>LOGO</Stack.Item>
    <Stack.Item>Filters</Stack.Item>
  </Stack>
);
