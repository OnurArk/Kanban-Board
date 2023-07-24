import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { tasksAction } from '../../../../../store/slices/task-slice';
import taskFetcher from '../../../../../store/actions/task-action';

import Button from '../../../../ui/button/button';

import styles from './task.module.css';
import { RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri';

const Task = (props) => {
  const { task, status } = props;
  console.log(task);

  const [isEditable, setIsEditable] = useState(false);
  const [updatedTaskText, setUpdatedTaskText] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('42');

  const dispatch = useDispatch();

  const removeTaskHandler = (id) => {
    dispatch(taskFetcher({ method: 'DELETE' }, `${status}/${task.positionId}`));

    dispatch(tasksAction.removeTask({ id, status }));
  };

  const editTaskTextHandler = (id) => {
    dispatch(
      taskFetcher(
        {
          method: 'PATCH',
          body: { ...task, description: updatedTaskText },
        },
        `${status}/${task.positionId}`
      )
    );

    // smoth transition
    dispatch(
      tasksAction.editTaskText({
        id,
        status,
        updatedTask: updatedTaskText,
      })
    );

    setIsEditable(false);
  };

  const toggleEdit = (e) => {
    setIsEditable((pre) => !pre);
    const scrollHeight =
      e.target.scrollHeight > 54 ? e.target.scrollHeight : 54;

    setUpdatedTaskText(task.item_description);
    setTextAreaHeight(scrollHeight);
  };

  const handleTaskTextOnChange = (e) => {
    setUpdatedTaskText(e.target.value);
    setTextAreaHeight(e.target.scrollHeight);
  };

  return (
    <div
      ref={props.innerRef}
      {...props.draggableProps}
      {...props.dragHandleProps}
    >
      <div
        style={{ background: task.backgroundColor }}
        className={styles['task-container']}
      >
        <h3 className={styles.title} style={{ color: task.textColor }}>
          {task?.item_title}
        </h3>
        {!isEditable && (
          <p
            onDoubleClick={toggleEdit}
            className={styles.description}
            style={{ color: task.textColor }}
          >
            {task?.item_description}
          </p>
        )}
        {isEditable && (
          <div className={styles['edit-container']}>
            <textarea
              onDoubleClick={toggleEdit}
              onKeyUp={handleTaskTextOnChange}
              value={updatedTaskText}
              onChange={handleTaskTextOnChange}
              className={styles.textarea}
              style={{ cursor: 'auto', height: `${textAreaHeight}px` }}
              autoFocus
            >
              {task.description}
            </textarea>
            <div className={styles.btns}>
              <Button
                type='button'
                onClick={toggleEdit}
                className={styles.cancelBtn}
              >
                Cancel
              </Button>
              <Button onClick={() => editTaskTextHandler(task.id)}>
                Update
              </Button>
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
