import { Icon, Image, Text } from '@fluentui/react';
import { Card, ICardTokens } from '@uifabric/react-cards';

import { JobOffer } from '../../interfaces/JobOffer';
import { sizing } from '../../theme/theme';

import styles from './OfferCard.module.scss';

interface OfferCardProps {
  offer: JobOffer;
}

const cardTokens: ICardTokens = {
  childrenGap: sizing(1),
};

const renderSalary = (salaryFrom, salaryTo, salaryCurrency) => {
  if (!salaryFrom && !salaryTo) {
    return 'Nie podano stawki';
  }
  const salaryParts = [];
  if (salaryFrom) {
    salaryParts.push(salaryFrom);
  }
  if (salaryFrom && salaryTo) {
    salaryParts.push(' - ');
  }
  if (salaryTo) {
    salaryParts.push(salaryTo);
  }
  if (salaryCurrency) {
    salaryParts.push(` ${salaryCurrency.toUpperCase()}`);
  }
  return salaryParts.join('');
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
      <Card.Section
        horizontal
        verticalAlign="center"
        className={styles.location}
      >
        <Icon iconName="MapPin" />
        <Text variant="small">{offer.city}</Text>
      </Card.Section>
      <Card.Item>
        <Text variant="small">
          {offer.skills.map((skill) => skill.name).join(', ')}
        </Text>
      </Card.Item>
      <Card.Item align="end">
        <Text className={styles.salary} variant="large">
          {renderSalary(
            offer.salary_from,
            offer.salary_to,
            offer.salary_currency,
          )}
        </Text>
      </Card.Item>
    </Card>
  );
};
