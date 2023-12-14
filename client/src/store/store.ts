import { configureStore } from "@reduxjs/toolkit";
import quiz from "./quizSlice";

const store = configureStore({
    reducer: {
        quiz
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;