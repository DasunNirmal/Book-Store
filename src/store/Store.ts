import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
    },
});

export type AppDispatch = typeof store.dispatch;