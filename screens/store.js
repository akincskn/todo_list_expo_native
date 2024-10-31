import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from './taskApi';
import taskSlice from './taskSlice';

const store = configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer,
        task: taskSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware),
});

export default store; 
