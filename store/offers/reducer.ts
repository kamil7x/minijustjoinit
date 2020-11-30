import { createReducer } from 'redux-act';

import { HYDRATE } from 'next-redux-wrapper';

import { JobOffer } from '../../interfaces/JobOffer';
import { setOffersList } from './actions';

export interface OffersState {
  list: JobOffer[];
}

const initialState: OffersState = {
  list: [],
};

export default createReducer(
  {
    [HYDRATE]: (state, payload) => ({ ...state, ...payload.offers }),
    [setOffersList as any]: (state, list) => ({ ...state, list }),
  },
  initialState,
);
