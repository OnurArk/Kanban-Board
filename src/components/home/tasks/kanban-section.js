import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { tasksAction } from '../../../store/slices/task-slice';

import Column from './column/column';
import AddStatus from './add-status/add-status';

import styles from './kanban-section.module.css';

const KanbanSection = () => {
  const { allStatus } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(destination);

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
    <Column status={status.category_title} id={status.id} key={status.id} />
  ));
  console.log(allStatus);

  return (
    <div className={styles['tasks-container']}>
      <AddStatus />
      <DragDropContext onDragEnd={onDragEnd}>
        {/* <Column status='todo' tasks={todo} />
        <Column status='progress' tasks={progress} />
        <Column status='done' tasks={done} /> */}
        {columns}
      </DragDropContext>
    </div>
  );
};

export default KanbanSection;
