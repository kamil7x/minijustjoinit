import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { Stack, Text, Link as UILink } from '@fluentui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FilterIcons } from '../components/FilterIcons/FilterIcons';
import { Layout } from '../components/Layout/Layout';
import { OfferCard } from '../components/OfferCard/OfferCard';
import { Section } from '../components/Section/Section';
import { SagaStore, wrapper } from '../store';
import { fetchOffersList } from '../store/offers/actions';
import { getOffersList } from '../store/offers/selectors';

import styles from '../styles/Home.module.scss';

interface HomeViewQuery {
  category: string;
  page: number;
}

const HomeView: React.FC = () => {
  const router = useRouter();
  // TODO: add proper pagination
  const { category, page = 1 } = (router.query as unknown) as HomeViewQuery;
  const offers = useSelector(getOffersList({ page, filter: category }));

  return (
    <Layout>
      <Head>
        <title>Mini JustJoinIT - Harder, Better, Faster, Stronger</title>
      </Head>
      <Section title="Dostępne oferty" extras={<FilterIcons />}>
        {offers.length ? (
          <Stack horizontal wrap className={styles.offerGrid}>
            {offers.map((offer) => (
              <Link href={`offers/${encodeURIComponent(offer.id)}`} key={offer.id}>
                <UILink className={styles.offerLink}>
                  <OfferCard offer={offer} />
                </UILink>
              </Link>
            ))}
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
