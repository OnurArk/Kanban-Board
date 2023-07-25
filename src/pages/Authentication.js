import React from 'react';
import { redirect, useSearchParams } from 'react-router-dom';

import api from '../components/ui/http/api';

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
  const firstName = data.get('firstName');
  const lastName = data.get('lastName');
  const username = data.get('username');
  const password = data.get('password');
  const confirmPassword = data.get('confirm-password');

  // Validation

  if (mode === 'signup') {
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

    if (!confirmPassword || !password) {
      toActionData.errMessage = 'You need to type';
      toActionData.errType
        ? toActionData.errType.push('password')
        : (toActionData.errType = ['password']);
    }

    if (confirmPassword && password !== confirmPassword) {
      toActionData.errMessage = 'Passwords did not match';
      toActionData.errType
        ? toActionData.errType.push('password')
        : (toActionData.errType = ['password']);
    }

    function checkAndSetError(
      toActionData,
      field,
      value,
      maxLength,
      errorMessage
    ) {
      if (!value) {
        toActionData.errMessage = errorMessage;
        toActionData.errType
          ? toActionData.errType.push(field)
          : (toActionData.errType = [field]);
      } else if (value.length >= maxLength) {
        toActionData.errMessage = `${field} should be at most ${maxLength} characters`;
        toActionData.errType
          ? toActionData.errType.push(field)
          : (toActionData.errType = [field]);
      }
    }

    checkAndSetError(
      toActionData,
      'firstName',
      firstName,
      15,
      'Fill the first name'
    );
    checkAndSetError(
      toActionData,
      'lastName',
      lastName,
      15,
      'Fill the last name'
    );
  }

  if (!username) {
    toActionData.errMessage = 'Fill the user name';
    toActionData.errType
      ? toActionData.errType.push('username')
      : (toActionData.errType = ['username']);
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

  const { requestFetch } = api();

  if (mode === 'signup') {
    try {
      const data = await requestFetch(
        {
          method: 'POST',
          body: {
            email: email,
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
          },
        },
        'user/create/'
      );

      if (data?.errMsg) {
        toActionData.errMessage = data?.errMsg;
        return toActionData;
      }
      if (data?.message && data?.status) {
        toActionData.errMessage = data?.message;
        toActionData.errType
          ? toActionData.errType.push(data?.status)
          : (toActionData.errType = [data?.status]);

        return toActionData;
      }

      toActionData.isSucceed = true;
      return redirect('/authentication');
    } catch (err) {
      toActionData.errMessage = err.message;

      return toActionData;
    }
  }

  if (mode === 'login') {
    try {
      const data = await requestFetch(
        {
          method: 'POST',
          body: {
            username: username,
            password: password,
          },
        },
        'auth/token/get/'
      );

      if (data?.errMsg) {
        toActionData.errMessage = 'Check your User Name and Password again';
        return toActionData;
      }

      localStorage.setItem('username', username);
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      //  get all user list
      requestFetch(
        {
          headers: {
            Authorization: 'Bearer' + data.access,
          },
        },
        'user/list/'
      );

      return redirect('/');
    } catch (err) {
      if (err.message.trim() === 'Error.') {
        toActionData.errMessage = 'Check your username and Password';
      } else {
        toActionData.errMessage = err.message;
      }

      return toActionData;
    }
  }

  // default behavier
  return redirect('/authentication');
}
