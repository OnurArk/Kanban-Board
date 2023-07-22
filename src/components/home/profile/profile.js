import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import api from '../../ui/http/api';

import styles from './profile.module.css';

const Profile = () => {
  const { ui, username } = useSelector((state) => state.user.user);

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  console.log(ui, username);

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
    console.log(response);

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

  return <div className={styles['profile-container']}></div>;
};

export default Profile;
