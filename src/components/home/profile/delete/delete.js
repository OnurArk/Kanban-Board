import React from 'react';
import { Form, Link } from 'react-router-dom';

import Button from '../../../ui/button/button';

import styles from './delete.module.css';

const Delete = ({ ui, username }) => {
  return (
    <Form method='DELETE' className={styles['delete-container']}>
      <input type='hidden' name={'ui'} value={ui} />
      <h4>Are you sure deleting account {username} ?</h4>
      <div>
        <Link to='?mode=profile'>
          <Button type='button' className={styles.btnCansel}>
            Cancel
          </Button>
        </Link>

        <Button className={styles.btn}>Yes</Button>
      </div>
    </Form>
  );
};

export default Delete;
