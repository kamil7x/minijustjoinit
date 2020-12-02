import { IStackTokens, Label, Stack } from '@fluentui/react';
import clsx from 'clsx';
import DevIcon from 'devicon-react-svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { sizing } from '../../theme/theme';

import styles from './FilterIcons.module.scss';

interface FilterIconsProps {
  baseUrl?: string;
}
const availableFilters = [
  'php',
  'java',
  'ruby',
  'javascript',
  'wordpress',
];
const customIconsMap = {
  ruby: 'ruby_rough',
};

const stackTokens: IStackTokens = {
  childrenGap: sizing(1),
};

export const FilterIcons = ({ baseUrl = '' }: FilterIconsProps) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <Stack horizontal tokens={stackTokens}>
      <Label>Filtruj:</Label>
      <Link href={baseUrl}>
        <a className={clsx(styles.button, { [styles.active]: !category })}>
          All
        </a>
      </Link>
      {availableFilters.map((filter) => {
        const iconName = customIconsMap[filter] || filter;
        const isActive = category === filter;

        const url = isActive ? baseUrl : `${baseUrl}/?category=${filter}`;

        return (
          <Link href={url} key={filter}>
            <a className={clsx(styles.button, { [styles.active]: isActive })}>
              <DevIcon className={styles.icon} icon={iconName} />
            </a>
          </Link>
        );
      })}
    </Stack>
  );
};
