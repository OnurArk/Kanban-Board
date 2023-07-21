import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import api from '../components/ui/http/api';
import taskFetcher from '../store/task-action';

import AddTaskSection from '../components/home/addtask-section/addtask-section';
import Clock from '../components/home/clock/clock';
import KanbanSection from '../components/home/tasks/kanban-section';

import styles from '../styles/Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isTokenExpired = useCallback((token) => {
    if (!token) {
      return true;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the payload of the JWT
    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds

    return Date.now() >= expirationTime;
  }, []);

  useEffect(() => {
    const { requestFetch, refreshToken, reqUserList } = api();

    // Function to handle token refresh
    const handleTokenRefresh = async () => {
      console.log('in handleTokenRefresh');

      try {
        const response = await refreshToken();
        console.log(response);

        if (response && response.access) {
          localStorage.setItem('accessToken', response.access);
          localStorage.setItem('refreshToken', response.refresh);
        } else {
          console.log('Error refreshing token or user unauthorized');
        }
      } catch (err) {
        console.log(err);
      }
    };

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/authentication');
    } else {
      const isAccessTokenExpired = isTokenExpired(accessToken);
      console.log(isAccessTokenExpired);

      if (isAccessTokenExpired) {
        handleTokenRefresh();
      } else {
        dispatch(taskFetcher({}));
      }
    }

    console.log(typeof localStorage.getItem('accessToken'));

    // get all user list
    // requestFetch(
    //   {
    //     headers: {
    //       Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    //     },
    //   },
    //   'user/list/'
    // );

    reqUserList();
  }, [dispatch, isTokenExpired, navigate]);

  return (
    <div className={styles.home}>
      <div className={styles.layout}>
        <AddTaskSection />
        <Clock />
        <KanbanSection />
      </div>
    </div>
  );
};

export default Home;
