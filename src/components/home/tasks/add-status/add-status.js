import { Form, Link, useSearchParams, useActionData } from 'react-router-dom';

import Input from '../../../ui/input/input';
import Button from '../../../ui/button/button';

import styles from './add-status.module.css';

const AddStatus = () => {
  const actionData = useActionData();

  const [searchParams] = useSearchParams();
  const isAdding = searchParams.get('mode') === 'adding-status';

  const statusError = actionData?.errType?.includes('status');

  return (
    <>
      {isAdding && (
        <>
          <Link to={'/home'} className={styles.span} />
          <Form method='POST' className={styles['form-container']}>
            <Input
              className={statusError ? null : styles.input}
              placeholder={'Use at most 15 characters'}
              name='status'
              invalid={statusError ? true : false}
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
            {actionData && actionData?.errMessage && (
              <p className={styles.err}>{actionData.errMessage}!</p>
            )}
          </Form>
        </>
      )}
    </>
  );
};

export default AddStatus;
