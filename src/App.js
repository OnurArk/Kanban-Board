import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import taskFetcher from './store/task-action';

import InputsSection from './components/addtask-section/addtask-section';
import KanbanSection from './components/tasks/kanban-section';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskFetcher({}));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <InputsSection />
      <KanbanSection />
    </div>
  );
}

export default App;
