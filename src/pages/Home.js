import React from 'react';

import AddTaskSection from '../components/home/addtask-section/addtask-section';
import Clock from '../components/home/clock/clock';
import KanbanSection from '../components/home/tasks/kanban-section';

import styles from '../styles/Home.module.css';

const Home = () => {
  console.log('a');

  return (
    <div className={styles.home}>
      <div className={styles.layout}>
        <AddTaskSection />
        <Clock />
        <KanbanSection />
      </div>
    </div>
  );
};

export default Home;
