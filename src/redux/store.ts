import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { cardApi } from './services/card/card';
import cardReducer from './slices/card';
import boardReducer from './slices/board';
import { checklistApi } from './services/card/checklist';
import { boardApi } from './services/board/board';
import { labelApi } from './services/board/label';

export const store = configureStore({
  reducer: {
    [cardApi.reducerPath]: cardApi.reducer,
    [checklistApi.reducerPath]: checklistApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    [labelApi.reducerPath]: labelApi.reducer,
    card: cardReducer,
    board: boardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      cardApi.middleware,
      checklistApi.middleware,
      boardApi.middleware,
      labelApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
