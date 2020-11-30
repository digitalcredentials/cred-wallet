import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  StoreEnhancer,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import {
  purgeStoredState,
  persistStore,
  persistReducer,
  PersistConfig,
} from 'redux-persist';
import reactotron from '../services/reactotron';
import rootSaga from '../sagas';

// Reducers
import { userReducer } from './user';
import { certificatesReducer } from './certificates';
import { searchReducer } from './search';

export const rootReducer = combineReducers({
  user: userReducer,
  certificates: certificatesReducer,
  search: searchReducer,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['search'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const sagaMonitor = reactotron?.createSagaMonitor!();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const enhancers: StoreEnhancer[] = [applyMiddleware(sagaMiddleware)];

if (reactotron) {
  enhancers.push(reactotron?.createEnhancer!());
}

// purgeStoredState(persistConfig);

export const store = createStore(persistedReducer, compose(...enhancers));

sagaMiddleware.run(rootSaga);

persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type AppAction = ReturnType<AppDispatch>;
