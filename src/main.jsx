import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import AllTask from './components/AllTask.jsx';
import PendingTask from './components/PendingTask.jsx';
import OverDueTask from './components/OverdueTask.jsx';
import CompletedTask from './components/CompletedTask.jsx';
import NotFound from './components/NotFound.jsx';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <AllTask />
        },
        {
          path: 'pendingtask',
          element: <PendingTask />
        },
        {
          path: 'overduetask',
          element: <OverDueTask />
        },
        {
          path: 'completedtask',
          element: <CompletedTask />
        }
      ]
    },
    {
      path: '*',
      element: <>
        <NotFound />
      </>
    }
  ]);

createRoot(document.getElementById('root')).render(

  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </StrictMode>
);