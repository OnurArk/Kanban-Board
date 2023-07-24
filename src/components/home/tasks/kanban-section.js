import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import taskFetcher from '../../../store/actions/task-action';
import { tasksAction } from '../../../store/slices/task-slice';

import Column from './column/column';
import AddStatus from './add-status/add-status';

import styles from './kanban-section.module.css';

const KanbanSection = () => {
  const { tasksByCategory, allStatus } = useSelector((state) => state.tasks);
  console.log(tasksByCategory);

  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(source); // {index: çıktığı index,droppableId: çıktığı statusId }
    console.log(destination); // {index: geldiği index,droppableId: geldiği statusId }
    console.log(tasksByCategory);
    console.log(tasksByCategory[source.droppableId][source.index]);

    if (!destination) return;
    //tasksByCategory use this to update and post again

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      // dont do anything if doenst chan position
      return;
    const { id, item_id, ...simpleTask } =
      tasksByCategory[source.droppableId][source.index];

    dispatch(
      taskFetcher(
        {
          method: 'PATCH',
          body: {
            ...simpleTask,
            order_id: destination.index + 1,
            category_id: destination.droppableId,
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        },
        `item/update/${id}/`
      )
    );

    // for smoth transition
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
      tasks={tasksByCategory[status.id] || []}
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
