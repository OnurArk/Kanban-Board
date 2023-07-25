import { redirect } from 'react-router-dom';

const api = () => {
  const requestFetch = async (requestConfig, endpoint) => {
    try {
      const apiUrl = 'http://134.209.207.128/api';
      const url = `${apiUrl}${endpoint ? `/${endpoint}` : '/'}`;

      const response = await fetch(url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers
          ? requestConfig.headers
          : { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 401) {
        if (data.code === 'token_not_valid') {
          return await handleTokenRefreshAndRetry(
            requestFetch,
            requestConfig,
            endpoint
          );
        } else {
          throw new Error('No active account found with the given credentials');
        }
      }

      if (response.status === 422) {
        throw new Error('This Email already exist');
      }

      if (response.status === 406) {
        return { message: data.message, status: response.status };
      }

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return data;
    } catch (err) {
      console.log(err.message);

      return { errMsg: err.message };
    }
  };

  const handleTokenRefreshAndRetry = async (
    retryFunction,
    requestConfig,
    endpoint,
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
      return await retryFunction(requestConfig, endpoint, sliceMethod);
    } catch (err) {
      console.log(err.message);
      // Handle errors during token refresh or retry failure
      return { errMsg: err.message };
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const apiUrl = 'http://134.209.207.128/api';
      const url = `${apiUrl}/auth/token/refresh/`;

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        throw new Error(response.status);
      }

      const data = await response.json();

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      return data;
    } catch (err) {
      return { redirect: +err.message === 401 ? true : false };
    }
  };

  return { requestFetch, refreshToken, handleTokenRefreshAndRetry };
};

export default api;
