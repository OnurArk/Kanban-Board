import React from 'react';
import { redirect, useSearchParams } from 'react-router-dom';

import SideImage from '../components/auth/sideImage/sideImage';
import Login from '../components/auth/login/login';
import Signup from '../components/auth/signup/signup';

import styles from '../styles/Authentication.module.css';

const Authentication = () => {
  const [seatchParams] = useSearchParams();

  const isSignup = seatchParams.get('mode') === 'signup';

  return (
    <div className={styles['auth-container']}>
      {!isSignup && <Login />}
      <SideImage isSignup={isSignup} />
      {isSignup && <Signup />}
    </div>
  );
};

export default Authentication;

export async function action({ request }) {
  const toActionData = {};

  // finding where this form sen from login or signup
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  // getting input values by input names
  const data = await request.formData();

  const email = data.get('email');
  const password = data.get('password');
  const confirmPassword = data.get('confirm-password');

  // Validation

  if (
    typeof email !== 'string' ||
    !email.includes('@') ||
    !email.includes('.com')
  ) {
    toActionData.errMessage = 'Email address must contain @ and .com';
    toActionData.errType
      ? toActionData.errType.push('email')
      : (toActionData.errType = ['email']);
  }

  if (mode === 'signup') {
    if (!confirmPassword || !password) {
      toActionData.errMessage = 'You need to type!';
      toActionData.errType
        ? toActionData.errType.push('password')
        : (toActionData.errType = ['password']);
    }

    if (confirmPassword && password !== confirmPassword) {
      toActionData.errMessage = 'Passwords did not match!';
      toActionData.errType
        ? toActionData.errType.push('password')
        : (toActionData.errType = ['password']);
    }
  }

  if (typeof password !== 'string' || password.length < 6) {
    toActionData.errMessage = 'Password must be > 6 characters';
    toActionData.errType
      ? toActionData.errType.push('password')
      : (toActionData.errType = ['password']);
  }

  // sending errors and types back to handle with useActionData
  if (Object.keys(toActionData).length) {
    return toActionData;
  }

  // Sending request

  if (mode === 'signup') {
    try {
      // signup api
      toActionData.isSucceed = true;
      return redirect('/');
    } catch (err) {
      toActionData.errMessage = err.message;

      return toActionData;
    }
  }

  if (mode === 'login') {
    try {
      // login method
      return redirect('/');
    } catch (err) {
      if (err.message.trim() === 'Error.') {
        toActionData.errMessage = 'Check your Email and Password';
      } else {
        toActionData.errMessage = err.message;
      }

      return toActionData;
    }
  }

  // default behavier
  return redirect('/authentication');
}
