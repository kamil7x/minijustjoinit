import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { FilterIcons } from '../components/FilterIcons/FilterIcons';
import { Layout } from '../components/Layout/Layout';
import { Section } from '../components/Section/Section';
import { SagaStore, wrapper } from '../store';
import { fetchOffersList } from '../store/offers/actions';
import { getOffersList } from '../store/offers/selectors';

interface MapViewQuery {
  category: string;
  offer: string;
}

const MapView: React.FC = () => {
  const router = useRouter();
  const { category, offer } = (router.query as unknown) as MapViewQuery;

  const offers = useSelector(getOffersList({ filter: category }));

  const Map = useMemo(
    () =>
      dynamic(
        async () => (await import('../components/Map/Map')).Map, //.then((mod) => mod.Map),
        { ssr: false },
      ),
    [],
  );

  return (
    <Layout>
      <Head>
        <title>Mini JustJoinIT - Harder, Better, Faster, Stronger</title>
      </Head>
      <Section title="Dostępne oferty" extras={<FilterIcons baseUrl="/map" />}>
        <Map offers={offers} highlightedOfferId={offer} />
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

export default MapView;
