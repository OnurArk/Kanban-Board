import React from 'react';

import Input from '../../../ui/input/input';
import Button from '../../../ui/button/button';

import styles from './update-user.module.css';

const UpdateUser = ({ ui }) => {
  console.log(ui);
  // To do burdan backende yollanıcak yeni updated information
  return (
    <div className={styles['user-new-info-container']}>
      <Input className={styles.input}>User Name</Input>
      <Input className={styles.input}>First Name</Input>
      <Input className={styles.input}>Last Name</Input>

      <Button className={styles.btn}>Save</Button>
    </div>
  );
};

export default UpdateUser;
