import { Form, Link } from 'react-router-dom';

import Input from '../../../ui/input/input';
import Button from '../../../ui/button/button';

import styles from './update-user.module.css';

const UpdateUser = ({ ui, username }) => {
  // todo actiondan çıkan hatayı dinle
  return (
    <Form method='PUT' className={styles['user-new-info-container']}>
      <Input type='hidden' name={'ui'} value={ui} />
      <Input type='hidden' name={'user-name'} value={username} />
      {/* <Input className={styles.input} name={'user-name'}>
        User Name
      </Input> */}
      <Input type='email' className={styles.input} name={'email'}>
        Email
      </Input>
      <Input className={styles.input} name={'first-name'}>
        First Name
      </Input>
      <Input className={styles.input} name={'last-name'}>
        Last Name
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

export default UpdateUser;
