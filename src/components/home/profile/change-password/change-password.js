import React from 'react';
import { Form, Link } from 'react-router-dom';

import Input from '../../../ui/input/input';
import Button from '../../../ui/button/button';

import styles from './change-password.module.css';

const ChangePassword = ({ ui, username }) => {
  return (
    <Form method='PUT' className={styles['change-password-container']}>
      <Input type='hidden' name={'ui'} value={ui} />
      <Input type='hidden' name={'user-name'} value={username} />
      <Input type='password' className={styles.input} name={'password'}>
        New Password
      </Input>
      <div>
        <Link to='?mode=profile'>
          <Button type='button' className={styles.btnCansel}>
            Cancel
          </Button>
        </Link>

        <Button className={styles.btn}>Save</Button>
      </div>
    </Form>
  );
};

export default ChangePassword;
