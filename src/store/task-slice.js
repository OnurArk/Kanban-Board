import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    todo: [],
    progress: [],
    done: [],
  },
  reducers: {
    addNewTask(state, action) {
      const task = action.payload;

      if (task.status === 'todo') {
        state.todo.push(task);
      }
      if (task.status === 'progress') {
        state.progress.push(task);
      }
      if (task.status === 'done') {
        state.done.push(task);
      }
    },
    removeTask(state, action) {
      const { id, title } = action.payload;

      if (title === 'todo') {
        state.todo = state.todo.filter((task) => task.id !== id);
      }
      if (title === 'progress') {
        state.progress = state.progress.filter((task) => task.id !== id);
      }
      if (title === 'done') {
        state.done = state.done.filter((task) => task.id !== id);
      }
    },
    editTask(state, action) {
      const { id, title, updatedTask } = action.payload;

      let taskToUpdate;
      if (title === 'todo') {
        taskToUpdate = state.todo.find((task) => task.id === id);
      }
      if (title === 'progress') {
        taskToUpdate = state.progress.find((task) => task.id === id);
      }
      if (title === 'done') {
        taskToUpdate = state.done.find((task) => task.id === id);
      }

      if (taskToUpdate) {
        taskToUpdate.description = updatedTask;
      }
    },
    updateTasks(state, action) {
      const { sourceId, sourceIndex, destinationId, destinationIndex } =
        action.payload;
      let movedTask;

      // removing
      if (sourceId === 'todo') {
        movedTask = state.todo.splice(sourceIndex, 1)[0];
      }
      if (sourceId === 'progress') {
        movedTask = state.progress.splice(sourceIndex, 1)[0];
      }
      if (sourceId === 'done') {
        movedTask = state.done.splice(sourceIndex, 1)[0];
      }

      // adding
      if (destinationId === 'todo') {
        state.todo.splice(destinationIndex, 0, movedTask);
      }
      if (destinationId === 'progress') {
        state.progress.splice(destinationIndex, 0, movedTask);
      }
      if (destinationId === 'done') {
        state.done.splice(destinationIndex, 0, movedTask);
      }
    },
  },
});

export const tasksAction = tasksSlice.actions;

export default tasksSlice;
