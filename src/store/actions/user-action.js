import { userAction } from '../slices/user-slice';

export const reqUserList = () => {
  return async (dispatch) => {
    try {
      const apiUrl = 'http://134.209.207.128/api';
      const url = `${apiUrl}/user/list/`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      if (!response.ok) {
        console.log(response);

        throw new Error(response.status);
      }

      const data = await response.json();
      console.log(data);

      dispatch(userAction.findUI(data));
    } catch (err) {
      console.log(err);
    }
  };
};
