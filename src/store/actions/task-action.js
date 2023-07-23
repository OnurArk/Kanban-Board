import { tasksAction } from '../slices/task-slice';

const taskFetcher = (requestConfig, endpoint, sliceMethod) => {
  return async (dispatch) => {
    try {
      const apiUrl = 'http://134.209.207.128/api/';
      const url = `${apiUrl}${endpoint ? `${endpoint}` : ''}`;

      const response = await fetch(url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers
          ? requestConfig.headers
          : { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(response.statusMessage);
      }

      if (sliceMethod && sliceMethod === 'getStatus') {
        dispatch(tasksAction.getStatus(data.categories));
      }
    } catch (err) {
      console.log(err.message || 'Something went wrong!');
    }
  };
};

export default taskFetcher;
