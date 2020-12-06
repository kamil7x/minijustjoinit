import { IStackTokens, Label, Stack } from '@fluentui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import { sizing } from '../../theme/theme';

import styles from './FilterIcons.module.scss';

interface FilterIconsProps {
  baseUrl?: string;
}
const availableFilters = ['php', 'java', 'ruby', 'net', 'wordpress'];
const customIconsMap = {
  net: 'dot-net',
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

        const url = queryString.stringifyUrl({
          url: baseUrl,
          query: {
            category: filter,
          },
        });

        return (
          <Link href={url} key={filter}>
            <a className={clsx(styles.button, { [styles.active]: isActive })}>
              <i className={clsx(styles.icon, `devicon-${iconName}-plain`)} />
            </a>
          </Link>
        );
      })}
    </Stack>
  );
};
