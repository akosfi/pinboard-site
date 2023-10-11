import { configureStore } from '@reduxjs/toolkit';
import { pinboardSlice } from 'modules/todos/pinboard';

export const store = configureStore({
    reducer: {
        pinboard: pinboardSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
