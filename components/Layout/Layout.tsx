import { IStackStyles, Stack } from '@fluentui/react';

import { sizing } from '../../theme/theme';
import { Header } from '../Header/Header';

const stackStyles: IStackStyles = {
  root: {
    padding: sizing(3),
    paddingTop: sizing(13),
  },
};

export const Layout: React.FC = ({ children }) => (
  <Stack styles={stackStyles}>
    <Header />
    {children}
  </Stack>
);
