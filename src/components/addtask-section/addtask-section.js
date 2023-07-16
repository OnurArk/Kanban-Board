import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import taskFetcher from '../../store/taskFetcher-action';
import { tasksAction } from '../../store/task-slice';

import Input from '../ui/input/input';
import Button from '../ui/button/button';

import styles from './addtask-section.module.css';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';

const InputsSection = () => {
  const [err, setErr] = useState(null);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef('todo');

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const status = statusRef.current.value;

    const errorsContain = [];

    if (!title) {
      errorsContain.push('title');
    }
    if (!description) {
      errorsContain.push('description');
    }
    if (!status) {
      errorsContain.push('status');
    }

    if (errorsContain.length !== 0) {
      setErr(errorsContain);
      return;
    }

    // produce random task background
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    // determine text color and title color based on background color brightness
    const brightnessThreshold = 128;
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    const textColor = brightness > brightnessThreshold ? '#000000' : '#FFFFFF';

    const newTask = {
      title,
      description,
      status,
      backgroundColor: color,
      textColor,
    };

    // sending to redux
    // dispatch(tasksAction.addNewTask(newTask));
    // sending to backend

    dispatch(
      taskFetcher(
        {
          method: 'POST',
          body: newTask,
        },
        newTask.status
      )
    );

    // reavaluate
    dispatch(taskFetcher({}));

    // Reset the form fields
    titleRef.current.value = '';
    descriptionRef.current.value = '';

    setErr(null);
  };

  const options = ['todo', 'progress', 'done'].map((type) => (
    <option value={`${type}`} key={type} className={styles.optns}>
      {type}
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
            {options}
          </select>
          <span className={styles['custom-arrow']}>
            <HiOutlineChevronDoubleDown className={styles.icon} />
          </span>
        </div>
      </div>

      <Button>Add Task</Button>
    </form>
  );
};

export default InputsSection;
