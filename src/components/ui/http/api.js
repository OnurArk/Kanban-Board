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
        throw new Error('No active account found with the given credentials');
      }

      if (response.status === 422) {
        throw new Error('This Email already exist');
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
        throw new Error(response.status);
      }

      const data = await response.json();

      return data;
    } catch (err) {
      return { redirect: +err.message === 401 ? true : false };
    }
  };

  return { requestFetch, refreshToken };
};

export default api;
