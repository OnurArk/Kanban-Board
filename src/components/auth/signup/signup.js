import React from 'react';
import { useNavigation, Link, useActionData } from 'react-router-dom';

import Button from '../../ui/button/button';
import Input from '../../ui/input/input';

import styles from './signup.module.css';

const Signup = () => {
  const actionData = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submittin';

  return (
    <div className={styles['signup-container']}>
      <h1>Sign Up</h1>
      <h4>Join the Dark Side!</h4>
      <Input
        name='email'
        type='email'
        placeholder='Example: mail@mail'
        err={actionData?.errType}
        autoComplete='email'
      >
        New Email
      </Input>
      <Input
        name='password'
        type='password'
        placeholder='At least 6 characters'
        err={actionData?.errType}
        autoComplete='new-password'
      >
        New Password
      </Input>
      <Input
        name='confirm-password'
        type='password'
        placeholder='Confirm New Password'
        err={actionData?.errType}
        autoComplete='new-password'
      >
        Confirm Password
      </Input>
      <Link to={'?mode=login'} className={styles.link}>
        Do you already have an account ?
      </Link>
      <div className={styles.btns}>
        <Button disabled={isSubmitting} className={styles.btn}>
          {isSubmitting ? 'Submitting...' : 'Signup'}
        </Button>
      </div>
    </div>
  );
};

export default Signup;
