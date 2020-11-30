import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { Stack, Link as UILink } from '@fluentui/react';
import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '../components/Layout/Layout';
import { OfferCard } from '../components/OfferCard/OfferCard';
import { Section } from '../components/Section/Section';
import { SagaStore, wrapper } from '../store';
import { fetchOffersList } from '../store/offers/actions';
import { getOffersList } from '../store/offers/selectors';

import styles from '../styles/Home.module.scss';

const Home = () => {
  const offers = useSelector(getOffersList);

  return (
    <Layout>
      <Head>
        <title>Mini JustJoinIT - Harder, Better, Faster, Stronger</title>
      </Head>
      <Section title="Dostępne oferty">
        <Stack horizontal wrap className={styles.offerGrid}>
          {offers.map((offer) => (
            <Link href={`offer/${offer.id}`} key={offer.id}>
              <UILink as="a" className={styles.offerLink}>
                <OfferCard offer={offer} />
              </UILink>
            </Link>
          ))}
        </Stack>
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

export default Home;
