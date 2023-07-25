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
        name='username'
        type='text'
        placeholder='User Name'
        invalid={
          actionData?.errType &&
          (actionData.errType.includes('username') ||
            actionData.errType.includes(406))
        }
        autoComplete='username'
      >
        User Name
      </Input>
      <Input
        type='password'
        name='password'
        placeholder='At least 6 characters'
        invalid={actionData?.errType?.includes('password') ? true : false}
        autoComplete='current-password'
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
      {actionData && actionData?.errMessage && (
        <p className={styles.err}>{actionData.errMessage}!</p>
      )}
    </Form>
  );
};

export default Login;
