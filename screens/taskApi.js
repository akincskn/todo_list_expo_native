import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/tasks',
        }),
        addTask: builder.mutation({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask,
            }),
        }),
    }),
});

export const { useGetTasksQuery, useAddTaskMutation } = taskApi;
