import {
  IImageStyles,
  ITextStyles,
  Icon,
  Image,
  ImageFit,
  Text,
} from '@fluentui/react';
import {
  Card,
  ICardSectionStyles,
  ICardStyles,
  ICardTokens,
} from '@uifabric/react-cards';

import { JobOffer } from '../../interfaces/JobOffer';
import { palette, sizing } from '../../theme/theme';

interface OfferCardProps {
  offer: JobOffer;
}

const cardStyles: ICardStyles = {
  root: {
    width: '100%',
    maxWidth: sizing(40),
    height: '100%',
    padding: sizing(2),
    cursor: 'inherit',
  },
};

const cardTokens: ICardTokens = {
  boxShadow: `0 1.6px 3.6px 0 ${palette.boxShadow}, 0 0.3px 0.9px 0 ${palette.boxShadowSecondary}`,
  boxShadowHovered: `0 1.6px 3.6px 0 ${palette.boxShadowDark}, 0 0.3px 0.9px 0 ${palette.boxShadowSecondaryDark}`,
  childrenGap: sizing(1),
};

const locationStyles: ICardSectionStyles = {
  root: {
    color: palette.primary,
  },
};

const headerStyles: ITextStyles = {
  root: {
    fontWeight: 'bold',
  },
};

const salaryStyles: ITextStyles = {
  root: {
    color: palette.secondary,
  },
};

const imageStyles: IImageStyles = {
  root: {},
  image: {
    width: '100%',
    height: '100%',
    maxWidth: sizing(8),
    maxHeight: sizing(8),
  },
};

export const OfferCard = ({ offer }: OfferCardProps) => {
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

  return (
    <Card styles={cardStyles} tokens={cardTokens}>
      <Card.Section
        horizontal
        horizontalAlign="space-between"
        verticalAlign="start"
        grow
      >
        <Text variant="large" styles={headerStyles}>
          {offer.title}
        </Text>
        {offer.company_logo_url && (
          <Image styles={imageStyles} src={offer.company_logo_url} />
        )}
      </Card.Section>
      <Card.Section horizontal verticalAlign="center" styles={locationStyles}>
        <Icon iconName="MapPin" />
        <Text variant="small">{offer.city}</Text>
      </Card.Section>
      <Card.Item>
        <Text variant="small">
          {offer.skills.map((skill) => skill.name).join(', ')}
        </Text>
      </Card.Item>
      <Card.Item align="end">
        <Text styles={salaryStyles} variant="large">
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
