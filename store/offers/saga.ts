import { put, takeLatest } from 'redux-saga/effects';

import * as Action from './actions';
import { setOffersList } from './actions';
import { fetchOffersList } from './service';

function* fetchOffersListSaga() {
  try {
    const offers = yield fetchOffersList();
    yield put(setOffersList(offers));
  } catch (e) {
    console.error(e);
  }
}

export default function* offersSaga() {
  yield takeLatest(Action.fetchOffersList, fetchOffersListSaga);
}
