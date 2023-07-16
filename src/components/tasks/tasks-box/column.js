import React from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './task/task';

import styles from './column.module.css';

const Column = (props) => {
  return (
    <Droppable droppableId={props.title}>
      {(provided, snapshot) => {
        return (
          <div className={styles['tasks-container']}>
            <h3 className={styles.mainTitle}>
              {props.title.charAt(0).toUpperCase() + props.title.slice(1)}
            </h3>
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
                          title={props.title}
                          index={index}
                          id={task.id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
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
