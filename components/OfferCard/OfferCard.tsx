import { Icon, Image, Text } from '@fluentui/react';
import { Card, ICardTokens } from '@uifabric/react-cards';

import { JobOffer } from '../../interfaces/JobOffer';
import { sizing } from '../../theme/theme';
import { Location } from '../Location/Location';
import { Salary } from '../Salary/Salary';

import styles from './OfferCard.module.scss';

interface OfferCardProps {
  offer: JobOffer;
}

const cardTokens: ICardTokens = {
  childrenGap: sizing(1),
};

export const OfferCard = ({ offer }: OfferCardProps) => {
  return (
    <Card tokens={cardTokens} className={styles.offerCard}>
      <Card.Section
        horizontal
        horizontalAlign="space-between"
        verticalAlign="start"
        grow
      >
        <Text variant="large" className={styles.jobTitle}>
          {offer.title}
        </Text>
        {offer.company_logo_url && (
          <Image
            shouldStartVisible={true}
            className={styles.logo}
            src={offer.company_logo_url}
          />
        )}
      </Card.Section>
      <Card.Item>
        <Location parts={[offer.city]} />
      </Card.Item>
      <Card.Item>
        <Text variant="small">
          {offer.skills.map((skill) => skill.name).join(', ')}
        </Text>
      </Card.Item>
      <Card.Item align="end">
        <Text className={styles.salary} variant="large">
          <Salary
            from={offer.salary_from}
            to={offer.salary_to}
            currency={offer.salary_currency}
          />
        </Text>
      </Card.Item>
    </Card>
  );
};
