import { all, fork } from 'redux-saga/effects';

import offersSaga from './offers/saga';

export default function* rootSaga() {
  yield all([fork(offersSaga)]);
}
