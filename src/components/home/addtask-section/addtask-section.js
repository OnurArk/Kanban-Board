import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import taskFetcher from '../../../store/actions/task-action';
// import { v4 as uuidv4 } from 'uuid';

import Input from '../../ui/input/input';
import Button from '../../ui/button/button';

import styles from './addtask-section.module.css';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';

// function generateRandomId() {
//   return uuidv4();
// }

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
    <option
      value={`${status.category_id}`}
      key={status.id}
      className={styles.optns}
    >
      {status.category_title}
    </option>
  ));

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <Input placeholder='Task Title' name='title' ref={titleRef} err={err}>
        Title
      </Input>
      <Input
        placeholder='Task Description'
        name='description'
        ref={descriptionRef}
        err={err}
      >
        Description
      </Input>
      <div className={styles.selectContainer}>
        <label htmlFor='status' className={styles.label}>
          Status
        </label>
        <div className={styles.selectLayout}>
          <select className={styles.typeSelect} ref={statusRef} name='status'>
            {allStatus.length > 0 ? (
              options
            ) : (
              <option value={'none'} className={styles.optns}>
                Add Status First!
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

// // produce id for each task
// const randomId = generateRandomId();

// // produce random task background
// const letters = '0123456789ABCDEF';
// let color = '#';
// for (let i = 0; i < 6; i++) {
//   color += letters[Math.floor(Math.random() * 16)];
// }

// // determine text color and title color based on background color brightness
// const brightnessThreshold = 128;
// const r = parseInt(color.substring(1, 3), 16);
// const g = parseInt(color.substring(3, 5), 16);
// const b = parseInt(color.substring(5, 7), 16);
// const brightness = (r * 299 + g * 587 + b * 114) / 1000;

// const textColor = brightness > brightnessThreshold ? '#000000' : '#FFFFFF';
