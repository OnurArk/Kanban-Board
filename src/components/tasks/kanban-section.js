import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { tasksAction } from '../../store/task-slice';

import Column from './column/column';

import styles from './kanban-section.module.css';

const KanbanSection = () => {
  const { todo, progress, done } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

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
        <Column status='todo' tasks={todo} />
        <Column status='progress' tasks={progress} />
        <Column status='done' tasks={done} />
      </DragDropContext>
    </div>
  );
};

export default KanbanSection;
