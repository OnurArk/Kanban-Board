import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    allStatus: [],
    tasksByCategory: {},
  },
  reducers: {
    getStatus(state, action) {
      const allStatus = action.payload;

      state.allStatus = Object.values(allStatus);
    },
    getTasks(state, action) {
      const tasks = action.payload;

      // Separate tasks by category_id
      state.tasksByCategory = Object.values(tasks || []).reduce((acc, task) => {
        const categoryId = task.category_id;
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(task);
        return acc;
      }, {});

      // Sort tasks for category by order_id
      Object.values(state.tasksByCategory).forEach((categoryTasks) => {
        categoryTasks?.sort((a, b) => a.order_id - b.order_id);
      });
    },
    updateTasks(state, action) {
      const { sourceId, sourceIndex, destinationId, destinationIndex } =
        action.payload;

      const movedTask = state.tasksByCategory[sourceId].splice(
        sourceIndex,
        1
      )[0];

      if (sourceId === destinationId) {
        // if status of source and destination are the same no need to delete
        state.tasksByCategory[destinationId]?.splice(
          destinationIndex,
          0,
          movedTask
        );
      } else {
        // adding new position the removed task
        if (state.tasksByCategory[destinationId]) {
          state.tasksByCategory[destinationId]?.splice(
            destinationIndex,
            0,
            movedTask
          );
        } else {
          state.tasksByCategory[destinationId] = [movedTask];
        }
      }
    },
  },
});

export const tasksAction = tasksSlice.actions;

export default tasksSlice;
