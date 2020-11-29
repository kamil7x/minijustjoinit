import { connect } from 'react-redux';

import { Stack, Link as UILink } from '@fluentui/react';
import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '../components/Layout/Layout';
import { OfferCard } from '../components/OfferCard/OfferCard';
import { Section } from '../components/Section/Section';
import { State, wrapper } from '../store';
import { getOffers } from '../store/service';

import styles from '../styles/Home.module.scss';

const Home = ({ offers }) => {
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
  async ({ store, req, res }) => {
    const offers = await getOffers();
    await store.dispatch({ type: 'SET_OFFERS', payload: offers });
    const state = store.getState();

    return {
      props: {
        offers: state.offers,
      },
    };
  },
);

export default connect((state: State) => state)(Home);
