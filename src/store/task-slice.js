import { createSlice } from '@reduxjs/toolkit';

import api from '../components/ui/http/api';

// http request handler for redux
const { requestFetch } = api();

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
      const data = requestFetch(
        {
          method: 'POST',
          body: task,
        },
        task.status
      );
      state[task.status].push({ ...task, positionId: data.name });
    },
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
      const data = requestFetch(
        { method: 'DELETE' },
        `${sourceId}/${movedTask.positionId}`
      );
      console.log(data);

      // adding new position the removed task
      state[destinationId].splice(destinationIndex, 0, movedTask);
      requestFetch(
        { method: 'PUT', body: state[destinationId] },
        `${destinationId}`
      ); // This is only pushing end of it
    },
    getAllTasks(state, action) {
      const allTasksData = action.payload;

      const todoTasks = [];
      const progressTasks = [];
      const doneTasks = [];

      for (const key in allTasksData.todo) {
        todoTasks.push({ ...allTasksData.todo[key], positionId: key });
      }
      for (const key in allTasksData.progress) {
        progressTasks.push({ ...allTasksData.progress[key], positionId: key });
      }
      for (const key in allTasksData.done) {
        doneTasks.push({ ...allTasksData.done[key], positionId: key });
      }

      state.todo = todoTasks;
      state.progress = progressTasks;
      state.done = doneTasks;
    },
  },
});

export const tasksAction = tasksSlice.actions;

export default tasksSlice;
