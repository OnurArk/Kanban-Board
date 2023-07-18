import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { tasksAction } from '../../../../store/task-slice';
import taskFetcher from '../../../../store/taskFetcher-action';

import Button from '../../../ui/button/button';

import styles from './task.module.css';
import { RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri';

const Task = (props) => {
  const { task, title, id } = props;
  console.log(id);

  const [isEditable, setIsEditable] = useState(false);
  const [updatedTaskText, setUpdatedTaskText] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('42');

  const dispatch = useDispatch();

  const removeTaskHandler = (id) => {
    dispatch(taskFetcher({ method: 'DELETE' }, `${title}/${task.positionId}`));

    dispatch(tasksAction.removeTask({ id, title }));
  };

  const editTaskTextHandler = (id) => {
    dispatch(
      taskFetcher(
        {
          method: 'PATCH',
          body: { ...task, description: updatedTaskText },
        },
        `${title}/${task.positionId}`
      )
    );

    // smoth transition
    dispatch(
      tasksAction.editTaskText({
        id,
        title,
        updatedTask: updatedTaskText,
      })
    );

    setIsEditable(false);
  };

  const toggleEdit = (e) => {
    setIsEditable((pre) => !pre);
    setUpdatedTaskText(task.description);
    setTextAreaHeight(e.target.scrollHeight);
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
              onKeyUp={handleTaskTextOnChange}
              value={updatedTaskText}
              onChange={handleTaskTextOnChange}
              className={styles.textarea}
              style={{ cursor: 'auto', height: `${textAreaHeight}px` }}
            >
              {task.description}
            </textarea>
            <div className={styles.btns}>
              <Button type='button' onClick={toggleEdit}>
                Cancel
              </Button>
              <Button
                onClick={() => editTaskTextHandler(task.id)}
                className={styles.updateBtn}
              >
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
