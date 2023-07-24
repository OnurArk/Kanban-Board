import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { tasksAction } from '../../../store/slices/task-slice';

import Column from './column/column';
import AddStatus from './add-status/add-status';

import styles from './kanban-section.module.css';

const KanbanSection = () => {
  const { alltasks, tasksByCategory, allStatus } = useSelector(
    (state) => state.tasks
  );

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

  const columns = allStatus.map((status) => (
    <Column
      status={status.category_title}
      id={status.id}
      key={status.id}
      tasks={tasksByCategory[status.category_id] || []}
    />
  ));

  return (
    <div className={styles['tasks-container']}>
      <AddStatus />
      <DragDropContext onDragEnd={onDragEnd}>{columns}</DragDropContext>
    </div>
  );
};

export default KanbanSection;
