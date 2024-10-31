import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        completeTask: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
    },
});

export const { addTask, completeTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
