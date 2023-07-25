import { Form, Link, useSearchParams } from 'react-router-dom';

import Input from '../../../ui/input/input';
import Button from '../../../ui/button/button';

import styles from './add-status.module.css';

const AddStatus = () => {
  const [searchParams] = useSearchParams();
  const isAdding = searchParams.get('mode') === 'adding-status';

  return (
    <>
      {isAdding && (
        <>
          <Link to={'/home'} className={styles.span} />
          <Form method='POST' className={styles['form-container']}>
            <Input
              className={styles.input}
              placeholder={'Use at most 15 characters'}
              name='status'
            >
              Status
            </Input>
            <div>
              <Link to='/home'>
                <Button type='button' className={styles.btnCansel}>
                  Cancel
                </Button>
              </Link>

              <Button className={styles.btn}>Save</Button>
            </div>
          </Form>
        </>
      )}
    </>
  );
};

export default AddStatus;
