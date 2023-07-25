import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import taskFetcher from '../../../../store/actions/task-action';

import Task from './task/task';

import styles from './column.module.css';
import { RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri';

const Column = (props) => {
  console.log(props);

  const [isEditable, setIsEditable] = useState(false);
  const [updatedTaskTitle, setUpdatedTaskTitle] = useState(
    props.status.charAt(0).toUpperCase() + props.status.slice(1)
  );
  const [textAreaHeight, setTextAreaHeight] = useState('18');

  const dispatch = useDispatch();

  const toggleEdit = (e) => {
    setIsEditable((pre) => !pre);
    const scrollHeight =
      e.target.scrollHeight > 54 ? e.target.scrollHeight : 54;

    setUpdatedTaskTitle(
      props.status.charAt(0).toUpperCase() + props.status.slice(1)
    );
    setTextAreaHeight(scrollHeight);
  };

  const handleTaskTitleOnChange = (e) => {
    if (e.key === 'Enter') {
      setIsEditable(false);
      // Save the changes and update the column title

      dispatch(
        taskFetcher(
          {
            method: 'PATCH',
            body: {
              category_title: updatedTaskTitle,
              order_id: props.orderId,
            },
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          },
          `category/update/${props.id}/`,
          'refetchStatus'
        )
      );
    } else {
      setUpdatedTaskTitle(e.target.value);
      setTextAreaHeight(e.target.scrollHeight);
    }
  };

  const handleDeleteRequest = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${
        props?.status ? props.status : 'this'
      } status?`
    );
    if (isConfirmed) {
      dispatch(
        taskFetcher(
          {
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          },
          `category/delete/${props.id}/`,
          'refetchStatus'
        )
      );
    }
  };

  return (
    <Droppable droppableId={`${props.id}`}>
      {(provided, snapshot) => {
        return (
          <div className={styles['tasks-container']}>
            {!isEditable ? (
              <>
                <h3 className={styles.mainTitle} onDoubleClick={toggleEdit}>
                  {props.status.charAt(0).toUpperCase() + props.status.slice(1)}
                  <RiEdit2Fill className={styles.edit} />
                </h3>
                <div className={styles['delete-container']}>
                  <RiDeleteBin2Fill
                    className={styles.bin}
                    onClick={handleDeleteRequest}
                  />
                </div>
              </>
            ) : (
              <textarea
                onDoubleClick={toggleEdit}
                onKeyUp={handleTaskTitleOnChange}
                value={updatedTaskTitle}
                onChange={handleTaskTitleOnChange}
                className={styles.textarea}
                style={{ cursor: 'auto', height: `${textAreaHeight}px` }}
                autoFocus
              >
                {updatedTaskTitle}
              </textarea>
            )}

            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.tasks}
            >
              {!props?.tasks || props.tasks?.length === 0 ? (
                <p>No Task To See</p>
              ) : (
                props?.tasks?.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={`${task.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      return (
                        <Task
                          task={task}
                          index={index}
                          innerRef={provided.innerRef}
                          draggableProps={provided?.draggableProps}
                          dragHandleProps={provided?.dragHandleProps}
                        />
                      );
                    }}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
