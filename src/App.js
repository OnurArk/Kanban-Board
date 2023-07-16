import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import taskFetcher from './store/taskFetcher-action';

import InputsSection from './components/addtask-section/addtask-section';
import KanbanSection from './components/tasks/kanban-section';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskFetcher({}));
  }, [dispatch]);

  return (
    <div>
      <InputsSection />
      <KanbanSection />
    </div>
  );
}

export default App;
