import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { IStackTokens, Stack, Text, Link as UILink } from '@fluentui/react';
import { Pagination } from '@uifabric/experiments';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import { FilterIcons } from '../components/FilterIcons/FilterIcons';
import { Layout } from '../components/Layout/Layout';
import { OfferCard } from '../components/OfferCard/OfferCard';
import { Section } from '../components/Section/Section';
import { getTotalPages } from '../helpers/pagination';
import { SagaStore, wrapper } from '../store';
import { fetchOffersList } from '../store/offers/actions';
import { getOffersList } from '../store/offers/selectors';
import { sizing } from '../theme/theme';

import styles from '../styles/HomeView.module.scss';

interface HomeViewQuery {
  category: string;
  page: number;
}

const stackTokens: IStackTokens = {
  childrenGap: sizing(2),
};

const HomeView: React.FC = () => {
  const router = useRouter();
  const { category, page = 1 } = (router.query as unknown) as HomeViewQuery;
  const filteredOffers = useSelector(getOffersList({ filter: category }));
  const offers = useSelector(getOffersList({ page, filter: category }));

  const pageCount = getTotalPages(filteredOffers);
  const onPageChange = async (pageId) => {
    const url = queryString.stringifyUrl({
      url: '/',
      query: {
        category,
        page: pageId + 1,
      },
    });

    await router.push(url);
    window.scrollTo({ left: 0, top: 0 });
  };

  return (
    <Layout>
      <Head>
        <title>Mini JustJoinIT - Harder, Better, Faster, Stronger</title>
      </Head>
      <Section title="Dostępne oferty" extras={<FilterIcons />}>
        {offers.length ? (
          <Stack tokens={stackTokens}>
            <Stack horizontal wrap className={styles.offerGrid}>
              {offers.map((offer) => (
                <Link
                  href={`offers/${encodeURIComponent(offer.id)}`}
                  key={offer.id}
                >
                  <UILink className={styles.offerLink}>
                    <OfferCard offer={offer} />
                  </UILink>
                </Link>
              ))}
            </Stack>
            <Stack.Item align="end" className={styles.pagination}>
              <Pagination
                pageCount={pageCount}
                selectedPageIndex={page - 1}
                format="buttons"
                onPageChange={onPageChange}
              />
            </Stack.Item>
            <Stack.Item align="end" className={styles.paginationMobile}>
              <Pagination
                pageCount={pageCount}
                selectedPageIndex={page - 1}
                onPageChange={onPageChange}
              />
            </Stack.Item>
          </Stack>
        ) : (
          <Text>Brak dostępnych ofert</Text>
        )}
      </Section>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    await store.dispatch(fetchOffersList());
    await store.dispatch(END);
    await (store as SagaStore).sagaTask.toPromise();
  },
);

export default HomeView;
