import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Login from '../components/auth/login/login';
import Signup from '../components/auth/signup/signup';

import styles from '../styles/Authentication.module.css';

const Authentication = () => {
  const [seatchParams] = useSearchParams();

  const isSignup = seatchParams.get('mode') === 'signup';

  return (
    <div className={styles['auth-container']}>
      <Login />
      {isSignup && <Signup />}
    </div>
  );
};

export default Authentication;
