import { AppState } from '../reducer';

export const getOffersList = (state: AppState) => state.offers.list;
