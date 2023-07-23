import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import Home, { action as homeAction } from './pages/Home';
import Profile, {
  action as profileAction,
} from './components/home/profile/profile';

import Authentication, { action as authAction } from './pages/Authentication';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Navigate replace key={'toHome'} to='/home' />} />
      <Route path='home' id='home-page' element={<Home />} action={homeAction}>
        <Route index element={<Profile />} action={profileAction} />
      </Route>

      <Route
        path='authentication'
        element={<Authentication />}
        action={authAction}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
