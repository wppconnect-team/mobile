import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

// Imports: Redux
import thunk from 'redux-thunk';
import rootReducer from '../reducer';
import {configureStore} from '@reduxjs/toolkit';

// Middleware: Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['global'],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

// Middleware: Redux Persist Persister
const persistor = persistStore(store);

//if (process.env.NODE_ENV !== 'production' && module.hot) {
//  module.hot.accept('./reducers', () => store.replaceReducer(persistedReducer));
//}

// Exports
export {store, persistor};
