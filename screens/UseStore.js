import { create } from 'zustand';

const UseStore = create((set) => ({
    tasks: [],
    addTask: (task) =>
        set((state) => ({
            tasks: [...state.tasks, { key: Math.random().toString(), value: task }],
        })),
    deleteTask: (taskKey) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.key !== taskKey),
        })),
    completeTask: (taskKey) =>
        set((state) => {
            const taskToComplete = state.tasks.find((task) => task.key === taskKey);
            return {
                tasks: state.tasks.filter((task) => task.key !== taskKey),
                completedTasks: [...state.completedTasks, taskToComplete],
            };
        }),
    completedTasks: [],
}));

export default UseStore;