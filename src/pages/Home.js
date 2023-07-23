import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

import api from '../components/ui/http/api';
import taskFetcher from '../store/actions/task-action';
import { reqUserList } from '../store/actions/user-action';

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

  // Function to handle token refresh
  const handleTokenRefresh = useCallback(async () => {
    const { refreshToken } = api();
    try {
      const response = await refreshToken();
      console.log(response);
      if (response && response?.redirect) {
        localStorage.setItem('accessToken', null);
        localStorage.setItem('refreshToken', null);
        localStorage.setItem('username', null);
        navigate('/authentication');
      }

      if (response && response.access) {
        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);
        dispatch(taskFetcher({}));
        dispatch(reqUserList());
      } else {
        console.log('Error refreshing token or user unauthorized');
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      localStorage.setItem('accessToken', null);
      localStorage.setItem('refreshToken', null);
      localStorage.setItem('username', null);
      navigate('/authentication');
    } else {
      const isAccessTokenExpired = isTokenExpired(accessToken);

      if (isAccessTokenExpired) {
        handleTokenRefresh();
      } else {
        dispatch(reqUserList());
        dispatch(taskFetcher({}));
      }
    }
  }, [dispatch, isTokenExpired, handleTokenRefresh, navigate]);

  return (
    <div className={styles.home}>
      <div className={styles.layout}>
        <AddTaskSection />
        <Clock />
        <KanbanSection />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
