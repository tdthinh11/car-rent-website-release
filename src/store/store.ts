import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import carReducer from './carSlice';
import drawerSlice from './drawerSlice';

const rootReducer = combineReducers({
  carReducer,
  drawerSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
