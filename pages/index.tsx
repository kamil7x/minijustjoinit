import {
  ILinkStyles,
  IStackTokens,
  Stack,
  Link as UILink,
} from '@fluentui/react';
import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '../components/Layout/Layout';
import { OfferCard } from '../components/OfferCard/OfferCard';
import { Section } from '../components/Section/Section';
import { EmploymentTypeEnum } from '../enums/EmploymentType.enum';
import { ExperienceLevelEnum } from '../enums/ExperienceLevel.enum';
import { JobOffer } from '../interfaces/JobOffer';
import { sizing } from '../theme/theme';

const mockedOffers: JobOffer[] = [
  {
    id: 'java-lead-ec220a85-c239-4d94-8490-9543c9e6499e',
    title: 'Java Lead',
    street: 'rynek',
    city: 'Kraków',
    country_code: 'PL',
    marker_icon: 'java',
    remote: false,
    experience_level: ExperienceLevelEnum.SENIOR,
    salary_from: 15000,
    salary_to: 25000,
    salary_currency: 'pln',
    latitude: 50.0618971,
    longitude: 19.9367559,
    employment_type: EmploymentTypeEnum.B2B,
    published_at: new Date('2019-01-09T15:28:01.856Z'),
    company_name: 'Gogozoom',
    company_url: 'http://gogozoom.com',
    company_size: '1+',
    company_logo_url:
      'https://test.justjoin.it/samples/offers/company_logos/original/688f52370eadf07080178cf1dd39b760e68b899a.png',
    skills: [
      { name: 'Java', level: 5 },
      { name: 'Microservices', level: 5 },
      { name: 'Distributed systems', level: 5 },
    ],
  },
  {
    id:
      'full-stack-developer-c%23-angular--c8019c07-908d-41b3-88f8-9e0554ba6acf',
    title: 'Full-stack Developer (C#/Angular)',
    street: 'Al. Jana Pawła II',
    city: 'Warszawa',
    country_code: 'PL',
    marker_icon: 'net',
    remote: false,
    experience_level: ExperienceLevelEnum.MID,
    salary_from: 15000,
    salary_to: 16000,
    salary_currency: 'pln',
    latitude: 52.2452495,
    longitude: 20.9908202,
    employment_type: EmploymentTypeEnum.PERMANENT,
    published_at: new Date('2019-01-09T15:00:15.795Z'),
    company_name: 'Funholding',
    company_url: 'http://funholding.com',
    company_size: '10-20',
    company_logo_url:
      'https://test.justjoin.it/samples/offers/company_logos/original/c1bd0e5b18d800a7b57582f3822c2cf788fdda88.png',
    skills: [
      { name: '.NET C#', level: 4 },
      { name: 'AngularJS', level: 4 },
      { name: 'SQL', level: 4 },
    ],
  },
];

const stackTokens: IStackTokens = {
  childrenGap: sizing(2),
};

const linkStyles: ILinkStyles = {
  root: {
    width: '100%',
    maxWidth: `${sizing(40)} !important`,
    color: 'inherit !important',
    textDecoration: 'none !important',
  },
};

export default function Home() {
  const availableOffers = mockedOffers;

  return (
    <Layout>
      <Head>
        <title>Mini JustJoinIT - Harder, Better, Faster, Stronger</title>
      </Head>
      <Section title="Dostępne oferty">
        <Stack horizontal wrap tokens={stackTokens}>
          {availableOffers.map((offer) => (
            <Link href={`offer/${offer.id}`} key={offer.id}>
              <UILink as="div" styles={linkStyles}>
                <OfferCard offer={offer} />
              </UILink>
            </Link>
          ))}
        </Stack>
      </Section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
