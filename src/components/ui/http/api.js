const api = () => {
  const requestFetch = async (requestConfig, endpoint) => {
    try {
      const apiUrl =
        'https://deneme-5775b-default-rtdb.firebaseio.com/allTasks';
      const url = `${apiUrl}${endpoint ? `/${endpoint}` : ''}.json`;
      const response = await fetch(url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.header ? requestConfig.header : {},
      });

      if (!response.ok) {
        throw new Error('Response Failed');
      }

      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  };
  return { requestFetch };
};

export default api;
