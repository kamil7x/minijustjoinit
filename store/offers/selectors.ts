import { PAGE_SIZE } from '../../helpers/pagination';
import { JobOffer } from '../../interfaces/JobOffer';
import { AppState } from '../reducer';

interface GetOffersListOptions {
  page?: number;
  filter?: string;
}

export const getOffersList = ({ page, filter }: GetOffersListOptions = {}) => {
  return (state: AppState): JobOffer[] => {
    const allOffers = state.offers.list;

    const filteredOffers = filter
      ? allOffers.filter((offer) => offer.marker_icon === filter)
      : allOffers;

    if (!page) {
      return filteredOffers;
    }

    const firstItemIndex = (page - 1) * PAGE_SIZE;
    const lastItemIndex = firstItemIndex + PAGE_SIZE;

    return filteredOffers.slice(firstItemIndex, lastItemIndex);
  };
};

export const getOffer = (id: string) => (state: AppState): JobOffer =>
  state.offers.list.find((offer) => offer.id === id);

export const getOffersCount = (state: AppState): number =>
  state.offers.list.length;
