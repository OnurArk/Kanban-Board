import React from 'react';
import { useNavigation, Link, useActionData, Form } from 'react-router-dom';

import Button from '../../ui/button/button';
import Input from '../../ui/input/input';

import styles from './signup.module.css';

const Signup = () => {
  const actionData = useActionData();
  console.log(actionData);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submittin';

  return (
    <Form method='post' className={styles['signup-container']} noValidate>
      <h1>Sign Up</h1>
      <h4>Join the Dark Side!</h4>
      <div className={styles['input-container']}>
        <Input
          name='email'
          type='email'
          placeholder='Example: mail@mail'
          invalid={actionData?.errType?.includes('email') ? true : false}
          autoFocus
        >
          Email
        </Input>
        <Input
          name='firstName'
          type='text'
          placeholder='First Name'
          invalid={actionData?.errType?.includes('firstName') ? true : false}
          autoComplete='given-name'
        >
          First Name
        </Input>
        <Input
          name='lastName'
          type='text'
          placeholder='Last Name'
          invalid={actionData?.errType?.includes('lastName') ? true : false}
          autoComplete='family-name'
        >
          Last Name
        </Input>
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
          name='password'
          type='password'
          placeholder='At least 6 characters'
          invalid={actionData?.errType?.includes('password') ? true : false}
          autoComplete='new-password'
        >
          New Password
        </Input>
        <Input
          name='confirm-password'
          type='password'
          placeholder='Confirm New Password'
          invalid={actionData?.errType?.includes('password') ? true : false}
          autoComplete='new-password'
        >
          Confirm Password
        </Input>
      </div>

      <Link to={'?mode=login'} className={styles.link}>
        Do you already have an account ?
      </Link>
      <div className={styles.btns}>
        <Button disabled={isSubmitting} className={styles.btn}>
          {isSubmitting ? 'Submitting...' : 'Signup'}
        </Button>
      </div>
      {actionData && actionData?.errMessage && (
        <p className={styles.err}>{actionData.errMessage}!</p>
      )}
    </Form>
  );
};

export default Signup;
