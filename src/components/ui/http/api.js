const api = () => {
  const requestFetch = async (requestConfig, endpoint) => {
    try {
      const apiUrl = 'http://134.209.207.128/api';
      const url = `${apiUrl}${endpoint ? `/${endpoint}/` : '/'}`;

      const response = await fetch(url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.header
          ? requestConfig.header
          : { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
      }

      const data = await response.json();
      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  };
  return { requestFetch };
};

export default api;
