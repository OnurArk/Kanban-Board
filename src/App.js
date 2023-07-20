import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import taskFetcher from './store/task-action';

import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Authentication, { action as authAction } from './pages/Authentication';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Navigate replace key={'toHome'} to='/home' />} />
      <Route path='home' id='home-page' element={<Home />} />

      <Route
        path='authentication'
        element={<Authentication />}
        action={authAction}
      />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // to get tasks data initally
    dispatch(taskFetcher({}));
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
