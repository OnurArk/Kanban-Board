import { tasksAction } from '../slices/task-slice';

import api from '../../components/ui/http/api';

const { handleTokenRefreshAndRetry } = api();

const taskFetcher = (requestConfig, endpoint, sliceMethod) => {
  return async (dispatch) => {
    console.log('a');

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
      console.log(response);

      if (response.status === 401) {
        return await handleTokenRefreshAndRetry(
          taskFetcher,
          requestConfig,
          endpoint,
          sliceMethod
        );
      }

      if (!response.ok && response.status !== 401) {
        throw new Error(response.statusMessage);
      }

      if (sliceMethod && sliceMethod === 'getStatus') {
        dispatch(tasksAction.getStatus(data.categories));
      }

      if (sliceMethod && sliceMethod === 'refetchStatus') {
        dispatch(
          taskFetcher(
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
              },
            },
            'category/list/',
            'getStatus'
          )
        );
      }
      if (!sliceMethod || sliceMethod !== 'getTasks') {
        dispatch(
          taskFetcher(
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
              },
            },
            'item/list/',
            'getTasks'
          )
        );
      }

      if (sliceMethod && sliceMethod === 'getTasks') {
        dispatch(tasksAction.getTasks(data.items));
      }
    } catch (err) {
      console.log(err.message || 'Something went wrong!');
    }
  };
};

export default taskFetcher;
