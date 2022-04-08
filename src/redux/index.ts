import {configureStore} from '@reduxjs/toolkit';
import imgReducer from './imgSlice';
import favReducer from './favSlice';
import sortReducer from './sortSlice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        images: imgReducer,
        favorite: favReducer,
        sort: sortReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;