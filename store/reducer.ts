import { combineReducers } from 'redux';

import offersReducer, { OffersState } from './offers/reducer';

export interface AppState {
  offers: OffersState;
}

export default combineReducers({
  offers: offersReducer,
});
