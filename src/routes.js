import { Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { NotFound } from './pages/not-found';
import { Events } from './pages/events';
import { Dashboard } from './pages/dashboard';
import Login from './pages/login';
import PrivateRoutes from './components/private-routes';

const routes = [
  {
    path: '/',
    element: <Navigate to='/dashboard' />,
  },
  {
    path: 'login',
    element: <Login />,
    children: [
      {
        path: '*',
        element: <Navigate to='/404' />,
      },
    ],
  },
  {
    path: '404',
    element: <NotFound />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: 'dashboard',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <Dashboard />,
          },
          {
            path: '*',
            element: <Navigate to='/404' />,
          },
        ],
      },
      {
        path: 'events',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <Events />,
          },
          {
            path: '*',
            element: <Navigate to='/404' />,
          },
        ],
      },
    ]
  },
];

export default routes;