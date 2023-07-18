import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { tasksAction } from '../../store/task-slice';

import Column from './tasks-box/column';

import styles from './kanban-section.module.css';

const KanbanSection = () => {
  const { todo, progress, done } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  console.log(progress);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    dispatch(
      tasksAction.updateTasks({
        sourceId: source.droppableId,
        sourceIndex: source.index,
        destinationId: destination.droppableId,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <div className={styles['tasks-container']}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Column title='todo' tasks={todo} />
        <Column title='progress' tasks={progress} />
        <Column title='done' tasks={done} />
      </DragDropContext>
    </div>
  );
};

export default KanbanSection;
