import { Store, applyMiddleware, createStore } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';

import { Context, MakeStore, createWrapper } from 'next-redux-wrapper';

import rootReducer, { AppState } from './reducer';
import rootSaga from './saga';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const makeStore: MakeStore<AppState> = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<AppState>(makeStore, { debug: false });
