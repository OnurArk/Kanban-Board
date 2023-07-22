import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import api from '../../ui/http/api';

import UpdateUser from './update-user/update-user';
import Button from '../../ui/button/button';

import styles from './profile.module.css';

import { BsCaretRightFill, BsCaretLeftFill } from 'react-icons/bs';

const dummyImage =
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80';

const Profile = () => {
  const { ui, username } = useSelector((state) => state.user.user);

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [isEditUser, setIsEditUser] = useState(false);
  console.log(ui, username);
  console.log(isEditUser);

  const toggleProfile = () => {
    setIsOpen((pre) => !pre);
    setIsEditUser(false);
  };

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

  return (
    <div
      className={`${styles['profile-container']} ${
        isOpen && styles.showProfile
      }`}
    >
      {isOpen && (
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
          <span className={styles.span} onClick={toggleProfile} />

          <Button className={styles.btn} onClick={() => setIsEditUser(true)}>
            Update
          </Button>

          {isEditUser && <UpdateUser ui={ui} />}
        </>
      )}

      <div className={styles.toggle} onClick={toggleProfile}>
        {isOpen ? (
          <BsCaretLeftFill className={styles.icon} />
        ) : (
          <BsCaretRightFill className={styles.icon} />
        )}
      </div>
    </div>
  );
};

export default Profile;
