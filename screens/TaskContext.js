import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const addTask = () => {
        if (task.length > 0) {
            setTasks([...tasks, { key: Math.random().toString(), value: task }]);
            setTask('');
        }
    };
    const deleteTask = (taskKey) => {
        setTasks((currentTasks) => {
            return currentTasks.filter((task) => task.key !== taskKey);
        });
    };
    const completeTask = (taskKey) => {
        const taskToComplete = tasks.find((task) => task.key === taskKey);
        setCompletedTasks([...completedTasks, taskToComplete]);
        setTasks((currentTasks) => currentTasks.filter((task) => task.key !== taskKey));
    };
    return (
        <TaskContext.Provider
            value={{
                task,
                setTask,
                tasks,
                addTask,
                deleteTask,
                completeTask,
                completedTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
