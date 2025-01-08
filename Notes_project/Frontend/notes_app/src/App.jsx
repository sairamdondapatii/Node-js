import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import AllNotes from './components/AllNotes';
import CreateNotes from './components/CreateNotes';
import Note from './components/Note';
import Homelayout from './components/Homelayout';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homelayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/notes',
        element: <AllNotes />,
      },
      {
        path: '/createnote',
        element: <CreateNotes />,
      },
      {
        path: '/notes/:id',
        element: <Note />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
