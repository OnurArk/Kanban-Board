import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import taskFetcher from '../../../store/actions/task-action';

import Input from '../../ui/input/input';
import Button from '../../ui/button/button';

import styles from './addtask-section.module.css';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';

const AddTaskSection = () => {
  const [err, setErr] = useState(null);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);

  const dispatch = useDispatch();
  const { allStatus } = useSelector((state) => state.tasks);

  const submitHandler = async (event) => {
    event.preventDefault();

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const statusId = statusRef.current.value;
    console.log();

    const errorsContain = [];

    if (!title) {
      errorsContain.push('title');
    }
    if (!description) {
      errorsContain.push('description');
    }
    if (!statusId) {
      errorsContain.push('status');
    }

    if (errorsContain.length !== 0) {
      setErr(errorsContain);
      return;
    }

    const newTask = {
      item_title: title,
      item_description: description,
      category_id: statusId,
    };
    console.log(statusId);

    dispatch(
      taskFetcher(
        {
          method: 'POST',
          body: newTask,
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        },
        'item/create/'
      )
    );

    // Reset the form fields
    titleRef.current.value = '';
    descriptionRef.current.value = '';

    setErr(null);
  };

  const options = allStatus.map((status) => (
    <option value={`${status.id}`} key={status.id} className={styles.optns}>
      {status.category_title}
    </option>
  ));

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <Input
        placeholder='Task Title'
        name='title'
        ref={titleRef}
        invalid={err?.includes('title')}
      >
        Title
      </Input>
      <Input
        placeholder='Task Description'
        name='description'
        ref={descriptionRef}
        invalid={err?.includes('description')}
      >
        Description
      </Input>
      <div className={styles.selectContainer}>
        <label htmlFor='status' className={styles.label}>
          <>
            <p>Status</p>
            <Link to={'?mode=adding-status'} className={styles.link}>
              <h4 className={styles.addBtn}>+</h4>
            </Link>
          </>
        </label>
        <div className={styles.selectLayout}>
          <select className={styles.typeSelect} ref={statusRef} name='status'>
            {allStatus.length > 0 ? (
              options
            ) : (
              <option value={'none'} className={styles.optns}>
                Add Status First !
              </option>
            )}
          </select>
          <span className={styles['custom-arrow']}>
            <HiOutlineChevronDoubleDown className={styles.icon} />
          </span>
        </div>
      </div>

      <Button className={styles.addTaskBtn}>Add Task</Button>
    </form>
  );
};

export default AddTaskSection;
