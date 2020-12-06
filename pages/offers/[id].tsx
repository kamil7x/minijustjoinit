import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import {
  IRatingStyles,
  IStackTokens,
  Image,
  Label,
  Rating,
  RatingSize,
  Stack,
  Text,
} from '@fluentui/react';
import { Card, ICardSectionTokens, ICardTokens } from '@uifabric/react-cards';
import clsx from 'clsx';
import Error from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import { InfoBox } from '../../components/InfoBox/InfoBox';
import { Layout } from '../../components/Layout/Layout';
import { Location } from '../../components/Location/Location';
import { Salary } from '../../components/Salary/Salary';
import { Section } from '../../components/Section/Section';
import { EmploymentTypeEnum } from '../../enums/EmploymentType.enum';
import { ExperienceLevelEnum } from '../../enums/ExperienceLevel.enum';
import { format } from '../../helpers/date';
import { SagaStore, wrapper } from '../../store';
import { fetchOffersList } from '../../store/offers/actions';
import { getOffer } from '../../store/offers/selectors';
import { palette, sizing } from '../../theme/theme';

import styles from '../../styles/OfferView.module.scss';

interface OfferQuery {
  id: string;
}

const stackTokens: IStackTokens = {
  childrenGap: sizing(2),
};

const ratingStyles: Partial<IRatingStyles> = {
  ratingStarBack: {
    color: palette.tertiary,
  },
  ratingStarFront: {
    color: palette.primary,
  },
};

const companyCardTokens: ICardTokens = {
  childrenGap: sizing(3),
};

const companyDetailsTokens: ICardSectionTokens = {
  childrenGap: sizing(2),
};

const employmentTypeLabel = {
  [EmploymentTypeEnum.PERMANENT]: 'UoP',
  [EmploymentTypeEnum.B2B]: 'B2B',
};
const experienceLevelLabel = {
  [ExperienceLevelEnum.JUNIOR]: 'Junior',
  [ExperienceLevelEnum.MID]: 'Mid',
  [ExperienceLevelEnum.SENIOR]: 'Senior',
};

const OfferView: React.FC = () => {
  const router = useRouter();
  const { id } = (router.query as unknown) as OfferQuery;

  const offer = useSelector(getOffer(id));

  if (!offer) {
    return <Error statusCode={404} />;
  }

  const mapUrl = queryString.stringifyUrl({
    url: '/map',
    query: {
      offer: offer.id,
    },
  });

  return (
    <Layout>
      <Head>
        <title>{offer.title} | Mini JustJoinIT</title>
      </Head>
      <Stack horizontal tokens={stackTokens} wrap>
        <Stack className={styles.leftColumn} tokens={stackTokens}>
          <Card className={clsx(styles.card, styles.mainCard)}>
            <Card.Section
              horizontal
              horizontalAlign="space-between"
              verticalAlign="center"
            >
              <Text variant="xLarge" className={styles.title}>
                {offer.title}
              </Text>
              <Text variant="xLarge" className={styles.salary}>
                <Salary
                  from={offer.salary_from}
                  to={offer.salary_to}
                  currency={offer.salary_currency}
                />
              </Text>
            </Card.Section>
            <Card.Section horizontal wrap horizontalAlign="space-between">
              <Stack.Item className={styles.infoBox}>
                <InfoBox
                  label="Poziom doświadczenia"
                  value={experienceLevelLabel[offer.experience_level]}
                />
              </Stack.Item>
              <Stack.Item className={styles.infoBox}>
                <InfoBox
                  label="Praca zdalna"
                  value={offer.remote ? 'Tak' : 'Nie'}
                />
              </Stack.Item>
              <Stack.Item className={styles.infoBox}>
                <InfoBox
                  label="Rodzaj umowy"
                  value={employmentTypeLabel[offer.employment_type]}
                />
              </Stack.Item>
            </Card.Section>
            <Card.Item>
              <Text variant="small">
                Opublikowano {format(new Date(offer.published_at), "PPP 'o' p")}
              </Text>
            </Card.Item>
          </Card>
          <Card
            className={clsx(styles.card, styles.companyCard)}
            horizontal
            tokens={companyCardTokens}
          >
            {offer.company_logo_url && (
              <Card.Item>
                <Image
                  shouldStartVisible={true}
                  className={styles.logo}
                  src={offer.company_logo_url}
                />
              </Card.Item>
            )}
            <Card.Section tokens={companyDetailsTokens} grow>
              <Text variant="xLarge">{offer.company_name}</Text>
              <Stack horizontal wrap horizontalAlign="space-between">
                <Stack.Item className={styles.infoBox}>
                  <InfoBox
                    label="Adres"
                    value={
                      <Link href={mapUrl}>
                        <a>
                          <Location
                            variant="medium"
                            parts={[
                              offer.street,
                              offer.city,
                              offer.country_code,
                            ]}
                          />
                        </a>
                      </Link>
                    }
                  />
                </Stack.Item>
                <Stack.Item className={styles.infoBox}>
                  <InfoBox label="Wielkość firmy" value={offer.company_size} />
                </Stack.Item>
                <Stack.Item className={styles.infoBox}>
                  <InfoBox
                    label="WWW"
                    value={
                      <a
                        className={styles.companyLink}
                        href={offer.company_url}
                      >
                        {offer.company_url}
                      </a>
                    }
                  />
                </Stack.Item>
              </Stack>
            </Card.Section>
          </Card>
        </Stack>
        <Stack className={styles.rightColumn} tokens={stackTokens}>
          <Card className={clsx(styles.card, styles.techStackCard)}>
            <Card.Item>
              <Section title="Tech stack">
                {offer.skills.map((skill) => (
                  <Stack
                    horizontal
                    horizontalAlign="space-between"
                    verticalAlign="center"
                    key={skill.name}
                    wrap
                  >
                    <Label>{skill.name}</Label>
                    <Rating
                      rating={skill.level}
                      size={RatingSize.Large}
                      readOnly
                      styles={ratingStyles}
                    />
                  </Stack>
                ))}
              </Section>
            </Card.Item>
          </Card>
        </Stack>
      </Stack>
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

export default OfferView;
