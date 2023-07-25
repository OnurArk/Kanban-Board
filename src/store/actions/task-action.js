import { tasksAction } from '../slices/task-slice';
import { redirect } from 'react-router-dom';

import api from '../../components/ui/http/api';

const { refreshToken } = api();

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

      if (response.status === 401) {
        return await handleTokenRefreshAndRetry(
          taskFetcher,
          requestConfig,
          endpoint,
          dispatch,
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

const handleTokenRefreshAndRetry = async (
  retryFunction,
  requestConfig,
  endpoint,
  dispatch,
  sliceMethod
) => {
  console.log(retryFunction);
  console.log(requestConfig);
  console.log(endpoint);
  console.log(sliceMethod);
  console.log(await retryFunction(requestConfig, endpoint, sliceMethod));

  try {
    const refreshedData = await refreshToken();
    if (refreshedData.redirect) {
      redirect('/authentication');
    }

    // Retry the original request with the updated access token
    return await dispatch(retryFunction(requestConfig, endpoint, sliceMethod));
  } catch (err) {
    console.log(err.message);
    // Handle errors during token refresh or retry failure
    return { errMsg: err.message };
  }
};

export default taskFetcher;
