import { tasksAction } from './task-slice';

const taskFetcher = (requestConfig, endpoint) => {
  return async (dispatch) => {
    try {
      const apiUrl =
        'https://deneme-5775b-default-rtdb.firebaseio.com/allTasks';
      const url = `${apiUrl}${endpoint ? `/${endpoint}` : ''}.json`;

      const response = await fetch(url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers
          ? requestConfig.headers
          : { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(response.statusMessage);
      }

      const data = await response.json();

      console.log(data);
      console.log(requestConfig.method);

      if (!requestConfig.method) {
        dispatch(tasksAction.getAllTasks(data));
      }
    } catch (err) {
      console.log(err.message || 'Something went wrong!');
    }
  };
};

export default taskFetcher;
