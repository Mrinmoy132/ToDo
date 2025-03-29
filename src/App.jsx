import Main from './components/Main'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllTask from './components/AllTask';
import PendingTask from './components/PendingTask';
import OverdueTask from './components/OverdueTask';
import CompletedTask from './components/CompletedTask';
import NotFound from './components/NotFound';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <>
          <Main />
        </>
      },
      {
        path: '/all_links',
        element: <>
          <Main />
        </>
      },
      {
        path: '/pendingtask',
        element: <>
          <Main />

        </>
      },
      {
        path: '/overduetask',
        element: <>
          <Main />
        </>
      },
      {
        path: '/completedtask',
        element: <>
          <Main />
        </>
      },
      {
        path: '*',
        element: <>
          <NotFound />
        </>
      },

    ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App


