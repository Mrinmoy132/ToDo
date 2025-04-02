import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    completedTask: JSON.parse(localStorage.getItem("completedTask")) ||  [],
    dueTask: JSON.parse(localStorage.getItem("dueTask")) || []
}

const saveToMachine = (state) => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
    localStorage.setItem("completedTask", JSON.stringify(state.completedTask));
    localStorage.setItem("dueTask", JSON.stringify(state.dueTask));
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: nanoid(),
                comments: action.payload.comments,
                date: action.payload.date,
                priority: action.payload.priority,
                title: action.payload.title,
                isCompleted: false
            }
            state.tasks.push(newTask);
            let today = new Date().toISOString().split("T")[0];         
            state.dueTask = state.tasks.filter(task => task.date < today && !task.isCompleted);
            saveToMachine(state);
        },

        overDueTask: (state) => {
            let today = new Date().toISOString().split("T")[0];          
            state.dueTask = state.tasks.filter(task => task.date < today && !task.isCompleted);
        },

        doneTask: (state, action) => {
            const taskId = action.payload;
            const id = state.tasks.find((t) => t.id == taskId);
            if (id) {
                id.isCompleted = true;
                state.completedTask.push(id);
                state.dueTask = state.dueTask.filter(task => task.id !== id.id);
                saveToMachine(state);
            }
        },


        removeTask: (state, action) => {
            if (window.confirm("Do you really want to delete the task?")) {
                state.tasks = state.tasks.filter((task) =>
                    task.id !== action.payload
                )
                state.completedTask = state.completedTask.filter((task) =>
                    task.id !== action.payload
                )
                state.dueTask = state.dueTask.filter((task) =>
                    task.id !== action.payload
                )
                saveToMachine(state);
            }
        },

        updateTask: (state, action) => {
            const alltask = state.tasks.find(t => t.id == action.payload.id);
            const completedtask = state.completedTask.find(t => t.id == action.payload.id);
            const duetask = state.dueTask.find(t => t.id == action.payload.id);
            if (alltask) {
                alltask.title = action.payload.title;
                alltask.priority = action.payload.priority;
                alltask.date = action.payload.date;
                alltask.comments = action.payload.comments;
            }
            if (completedtask) {
                completedtask.title = action.payload.title;
                completedtask.priority = action.payload.priority;
                completedtask.date = action.payload.date;
                completedtask.comments = action.payload.comments;
            }
            if (duetask) {
                duetask.title = action.payload.title;
                duetask.priority = action.payload.priority;
                duetask.date = action.payload.date;
                duetask.comments = action.payload.comments;
                let today = new Date().toISOString().split("T")[0];          
                state.dueTask = state.tasks.filter(task => task.date < today && !task.isCompleted);
            }
            saveToMachine(state);
        },
    }
});

export const { addTask, doneTask, removeTask, updateTask, overDueTask } = taskSlice.actions;

export default taskSlice.reducer;