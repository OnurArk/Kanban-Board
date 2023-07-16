import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    todo: [],
    progress: [],
    done: [],
  },
  reducers: {
    // addNewTask(state, action) {
    //   const task = action.payload;

    //   state[task.status].push(task);
    // },
    removeTask(state, action) {
      const { id, title } = action.payload;
      state[title] = state[title].filter((task) => task.id !== id);
    },
    editTaskText(state, action) {
      const { id, title, updatedTask } = action.payload;
      const taskToUpdate = state[title].find((task) => task.id === id);

      if (taskToUpdate) {
        taskToUpdate.description = updatedTask;
      }
    },
    updateTasks(state, action) {
      const { sourceId, sourceIndex, destinationId, destinationIndex } =
        action.payload;

      // removing task also saving removed tasked
      const movedTask = state[sourceId].splice(sourceIndex, 1)[0];

      // adding new position the removed task
      state[destinationId].splice(destinationIndex, 0, movedTask);
    },
    getAllTasks(state, action) {
      const allTasksData = action.payload;
      console.log(Object.values(allTasksData.todo));

      // for loob al key id olsun önüne de todo falan ekle

      const todoTasks = [];
      const progressTasks = [];
      const doneTasks = [];

      for (const key in allTasksData.todo) {
        todoTasks.push({ ...allTasksData.todo[key], id: key });
      }
      for (const key in allTasksData.progress) {
        progressTasks.push({ ...allTasksData.progress[key], id: key });
      }
      for (const key in allTasksData.done) {
        doneTasks.push({ ...allTasksData.done[key], id: key });
      }
      console.log(doneTasks);

      state.todo = todoTasks;
      state.progress = progressTasks;
      state.done = doneTasks;
    },
  },
});

export const tasksAction = tasksSlice.actions;

export default tasksSlice;
