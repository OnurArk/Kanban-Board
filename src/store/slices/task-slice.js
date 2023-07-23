import { createSlice } from '@reduxjs/toolkit';

import api from '../../components/ui/http/api';

// http request handler for redux
const { requestFetch } = api();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    alltasks: { todo: [], progress: [], done: [] },
    allStatus: [],
  },
  reducers: {
    getStatus(state, action) {
      const allStatus = action.payload;

      state.allStatus = Object.values(allStatus);

      console.log(state.allStatus);
    },
    addNewTask(state, action) {},
  },
});

export const tasksAction = tasksSlice.actions;

export default tasksSlice;

// addNewTask(state, action) {
//   const task = action.payload;

//   state.alltasks[task.status].push(task);
// },
// removeTask(state, action) {
//   const { id, status } = action.payload;
//   state.alltasks[status] = state.alltasks[status].filter(
//     (task) => task.id !== id
//   );
// },
// editTaskText(state, action) {
//   const { id, status, updatedTask } = action.payload;
//   const taskToUpdate = state.alltasks[status].find(
//     (task) => task.id === id
//   );

//   if (taskToUpdate) {
//     taskToUpdate.description = updatedTask;
//   }
// },
// updateTasks(state, action) {
//   const { sourceId, sourceIndex, destinationId, destinationIndex } =
//     action.payload;

//   const movedTask = state.alltasks[sourceId].splice(sourceIndex, 1)[0];

//   if (sourceId === destinationId) {
//     // when status of source and destination is same no need to delete

//     state.alltasks[destinationId].splice(destinationIndex, 0, movedTask);
//     requestFetch(
//       { method: 'PUT', body: state.alltasks[destinationId] },
//       `${destinationId}`
//     );
//   } else {
//     // removing task also saving removed tasked

//     requestFetch(
//       { method: 'DELETE' },
//       `${sourceId}/${movedTask.positionId}`
//     );

//     // adding new position the removed task
//     state.alltasks[destinationId].splice(destinationIndex, 0, movedTask);
//     requestFetch(
//       { method: 'PUT', body: state.alltasks[destinationId] },
//       `${destinationId}`
//     ); // This is only pushing end of it
//   }
// },
// getAllTasks(state, action) {
//   const allTasksData = action.payload;

//   const todoTasks = [];
//   const progressTasks = [];
//   const doneTasks = [];

//   for (const key in allTasksData.todo) {
//     if (allTasksData.todo[key]?.id) {
//       todoTasks.push({ ...allTasksData.todo[key], positionId: key });
//     }
//   }
//   for (const key in allTasksData.progress) {
//     if (allTasksData.progress[key]?.id) {
//       progressTasks.push({
//         ...allTasksData.progress[key],
//         positionId: key,
//       });
//     }
//   }
//   for (const key in allTasksData.done) {
//     if (allTasksData.done[key]?.id) {
//       doneTasks.push({ ...allTasksData.done[key], positionId: key });
//     }
//   }
//   state.alltasks.todo = todoTasks;
//   state.alltasks.progress = progressTasks;
//   state.alltasks.done = doneTasks;
//},
