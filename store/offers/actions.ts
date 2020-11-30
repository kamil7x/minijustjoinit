import { createAction } from 'redux-act';

import { JobOffer } from '../../interfaces/JobOffer';

export const fetchOffersList = createAction();
export const setOffersList = createAction<JobOffer[]>();
