import { AnyAction, createStore } from 'redux';

import { Context, HYDRATE, MakeStore, createWrapper } from 'next-redux-wrapper';

import { JobOffer } from '../interfaces/JobOffer';

export interface State {
  offers: JobOffer[];
}

const initialState: State = {
  offers: [],
};

const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case 'SET_OFFERS':
      return {
        ...state,
        offers: action.payload,
      };
    default:
      return state;
  }
};

const makeStore: MakeStore<State> = (context: Context) => createStore(reducer);

export const wrapper = createWrapper<State>(makeStore, { debug: true });
