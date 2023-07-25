import React, { useEffect, useState } from 'react';
import { Link, redirect, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import api from '../../ui/http/api';

import UpdateUser from './update-user/update-user';
import ChangePassword from './change-password/change-password';
import Delete from './delete/delete';
import Button from '../../ui/button/button';

import styles from './profile.module.css';

import { BsCaretRightFill, BsCaretLeftFill } from 'react-icons/bs';
import { FiEdit3 } from 'react-icons/fi';

const dummyImage =
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80';

const Profile = () => {
  const { ui, username } = useSelector((state) => state.user.user);

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [searchParams] = useSearchParams();

  const isProfile = searchParams.get('mode') === 'profile';
  const isUpdating = searchParams.get('nav') === 'update';
  const isChangingPassword = searchParams.get('nav') === 'change-password';
  const isDeleting = searchParams.get('nav') === 'delete';

  const reqUserInfo = async (ui) => {
    const { requestFetch } = api();

    const response = await requestFetch(
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      },
      `user/get/${ui}/`
    );

    setEmail(response.email);
    setUserName(response.username);
    setFirstName(response.first_name);
    setLastName(response.last_name);
  };

  useEffect(() => {
    if (ui) {
      reqUserInfo(ui);
    }
  }, [ui]);

  const logoutHandler = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
  };

  return (
    <div
      className={`${styles['profile-container']} ${
        isProfile && styles.showProfile
      }`}
    >
      {isProfile && (
        <>
          <div className={styles['img-container']}>
            <img src={dummyImage} alt='user' className={styles.img} />
          </div>

          <div className={styles.textSection}>
            <h4 className={styles.secTitle}>User Name</h4>
            <p>{userName}</p>
          </div>
          <div className={styles.textSection}>
            <h4 className={styles.secTitle}>Email</h4>
            <p>{email}</p>
          </div>
          <div className={styles.textSection}>
            <h4 className={styles.secTitle}>First Name</h4>
            <p>{firstName}</p>
          </div>
          <div className={styles.textSection}>
            <h4 className={styles.secTitle}>Last Name</h4>
            <p>{lastName}</p>
          </div>
          <Link
            to={'?mode=profile&nav=change-password'}
            className={styles.changePassword}
          >
            <p>Change Password</p>
            <FiEdit3 className={styles.icon} />
          </Link>
          <Link to={isProfile ? '/home' : '?mode=profile'}>
            <span className={styles.span} />
          </Link>

          <Link to={'?mode=profile&nav=update'}>
            <Button className={styles.btn}>Update</Button>
          </Link>

          <Link to={'?mode=profile&nav=delete'}>
            <Button className={styles.btnDelete}>Delete</Button>
          </Link>

          <Link to={'/authentication'}>
            <Button onClick={logoutHandler}>Logout</Button>
          </Link>

          {isChangingPassword && <ChangePassword ui={ui} username={username} />}
          {isUpdating && <UpdateUser ui={ui} username={username} />}
          {isDeleting && <Delete ui={ui} username={username} />}
        </>
      )}
      <Link to={isProfile ? '/home' : '?mode=profile'}>
        <div className={styles.toggle}>
          {isProfile ? (
            <BsCaretLeftFill className={styles.icon} />
          ) : (
            <BsCaretRightFill className={styles.icon} />
          )}
        </div>
      </Link>
    </div>
  );
};

export default Profile;

export async function action({ request }) {
  const toActionData = {};
  const { requestFetch } = api();

  const searchParams = new URL(request.url).searchParams;
  const nav = searchParams.get('nav');

  const data = await request.formData();

  const uid = data.get('ui');

  const username = data.get('user-name');
  const email = data.get('email');
  const firstName = data.get('first-name');
  const lastName = data.get('last-name');

  const password = data.get('password');

  console.log(nav);
  console.log(username);

  if (!nav) {
    return redirect('/');
  }

  if (!uid) {
    toActionData.errMessage = 'Some thing went wrong!';
    return toActionData;
  }

  if (nav === 'update') {
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

    if (!username || !email || !firstName || !lastName) {
      toActionData.errMessage = 'You should fill Inputs';
    }

    // sending errors and types back to handle with useActionData
    if (Object.keys(toActionData).length) {
      return toActionData;
    }

    const response = await requestFetch(
      {
        method: 'PUT',
        body: {
          id: uid,
          username,
          first_name: firstName,
          last_name: lastName,
          email,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      },
      `user/update/${uid}/`
    );

    if (response.errMsg) {
      toActionData.errMessage = response.errMsg;
      return toActionData;
    }
  }

  if (nav === 'change-password') {
    if (typeof password !== 'string' || password.length < 6) {
      toActionData.errMessage = 'Password must be > 6 characters';
      toActionData.errType
        ? toActionData.errType.push('password')
        : (toActionData.errType = ['password']);
    }

    if (Object.keys(toActionData).length) {
      return toActionData;
    }

    const response = await requestFetch(
      {
        method: 'PUT',
        body: {
          id: uid,
          username,
          password,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      },
      `user/change_password/${uid}/`
    );

    if (response.errMsg) {
      toActionData.errMessage = response.errMsg;
      return toActionData;
    }
  }

  if (nav === 'delete') {
    const response = await requestFetch(
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      },
      `user/delete/${uid}/`
    );

    if (response.errMsg) {
      toActionData.errMessage = response.errMsg;
      return toActionData;
    }

    return redirect('/authentication');
  }

  return redirect('/');
}
