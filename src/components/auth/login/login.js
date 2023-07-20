import React from 'react';
import { useNavigation, useActionData, Link, Form } from 'react-router-dom';

import Input from '../../ui/input/input';
import Button from '../../ui/button/button';

import styles from './login.module.css';

const Login = () => {
  const actionData = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submittin';

  return (
    <Form method='post' className={styles['login-container']}>
      <h1>Log In</h1>
      <h4>Hello There!</h4>
      <Input
        type='email'
        name='email'
        err={actionData?.errType}
        errMsg={actionData?.errMessage}
      >
        Email
      </Input>
      <Input
        type='password'
        name='password'
        err={actionData?.errType}
        errMsg={actionData?.errMessage}
      >
        Password
      </Input>
      <Link to={'?mode=signup'} className={styles.link}>
        +Sign Up
      </Link>
      <div className={styles.btns}>
        <Button disabled={isSubmitting} className={styles.btn}>
          {isSubmitting ? 'Submitting...' : 'Login'}
        </Button>
      </div>
    </Form>
  );
};

export default Login;
