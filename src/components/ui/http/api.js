const api = () => {
  const requestFetch = async (requestConfig, endpoint) => {
    try {
      const apiUrl = 'http://134.209.207.128/api';
      const url = `${apiUrl}${endpoint ? `/${endpoint}` : '/'}`;
      console.log(url);

      const response = await fetch(url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.header
          ? requestConfig.header
          : { 'Content-Type': 'application/json' },
      });

      console.log(response.status);
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (response.status === 401) {
        throw new Error('No active account found with the given credentials');
      }

      if (response.status === 422) {
        throw new Error('This Email already exist');
      }

      if (!response.ok) {
      }

      return data;
    } catch (err) {
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

      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const reqUserList = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const apiUrl = 'http://134.209.207.128/api';
      const url = `${apiUrl}/user/list/`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return { requestFetch, refreshToken, reqUserList };
};

export default api;
