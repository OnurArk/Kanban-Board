import React from 'react';
import { useNavigation, useSearchParams, Link } from 'react-router-dom';

import Input from '../../ui/input/input';
import Button from '../../ui/button/button';

import styles from './login.module.css';

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submittin';

  // const [searchParams] = useSearchParams();
  // const isSignup = searchParams.get('mode') === 'signup';

  return (
    <div className={styles['login-container']}>
      <h1>Log In</h1>
      <h4 className={styles.sideTitle}>Hello There!</h4>
      <Input type='email'>Email</Input>
      <Input type='password'>Password</Input>
      <Link to={'?mode=signup'} className={styles.link}>
        +Sign Up
      </Link>
      <div className={styles.btns}>
        <Button disabled={isSubmitting} className={styles.btn}>
          {isSubmitting ? 'Submitting...' : 'Login'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
