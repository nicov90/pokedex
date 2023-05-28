import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './slices/general';
import accountReducer from './slices/account';
import currentUserReducer from './slices/currentUser';
import pokemonReducer from './slices/pokemon';
import registerReducer from './slices/register';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    general: generalReducer,
    account: accountReducer,
    register: registerReducer,
    currentUser: currentUserReducer,
    pokemon: pokemonReducer,
  }
})