import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { tasksAction } from '../../../../store/task-slice';
import taskFetcher from '../../../../store/taskFetcher-action';

import Button from '../../../ui/button/button';

import styles from './task.module.css';
import { RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri';

const Task = (props) => {
  const { task, title, index } = props;

  const [isEditable, setIsEditable] = useState(false);
  const [updatedTaskText, setUpdatedTaskText] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('42');

  const dispatch = useDispatch();

  const removeTaskHandler = (id) => {
    dispatch(tasksAction.removeTask({ id, title }));
  };

  const editTaskHandler = (id) => {
    dispatch(
      tasksAction.editTaskText({
        id,
        title,
        updatedTask: updatedTaskText,
      })
    );

    dispatch(
      taskFetcher(
        {
          method: 'PATCH',
          body: { ...task, description: updatedTaskText },
        },
        `${title}/${task.id}`
      )
    );
    setIsEditable(false);
  };

  const toggleEdit = () => {
    setIsEditable((pre) => !pre);
    setUpdatedTaskText(task.description);
  };

  const handleTaskTextChange = (e) => {
    setUpdatedTaskText(e.target.value);
    setTextAreaHeight(e.target.scrollHeight);
  };

  return (
    <div
      ref={props.innerRef}
      {...props.draggableProps}
      {...props.dragHandleProps}
    >
      <div style={{ background: task.backgroundColor }} className={styles.task}>
        <h3 className={styles.title} style={{ color: task.textColor }}>
          {task.title}
        </h3>
        {!isEditable && (
          <p
            onDoubleClick={toggleEdit}
            className={styles.description}
            style={{ color: task.textColor }}
          >
            {task.description}
          </p>
        )}
        {isEditable && (
          <div className={styles['edit-container']}>
            <textarea
              onKeyUp={handleTaskTextChange}
              value={updatedTaskText}
              onChange={handleTaskTextChange}
              className={styles.textarea}
              style={{ cursor: 'auto', height: `${textAreaHeight}px` }}
            >
              {task.description}
            </textarea>
            <div className={styles.btns}>
              <Button type='button' onClick={toggleEdit}>
                Cancel
              </Button>
              <Button onClick={() => editTaskHandler(task.id)}>Update</Button>
            </div>
          </div>
        )}
        <div className={styles['edit-delete']}>
          <RiDeleteBin2Fill
            className={styles.bin}
            onClick={() => removeTaskHandler(task.id)}
          />
          <RiEdit2Fill className={styles.edit} onClick={toggleEdit} />
        </div>
      </div>
    </div>
  );
};

export default Task;
