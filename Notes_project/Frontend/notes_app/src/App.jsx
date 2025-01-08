import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import AllNotes from './Pages/AllNotes';
import CreateNotes from './Pages/CreateNotes';
import Note from './Pages/Note';
import Homelayout from './Pages/Homelayout';
import Home from './Pages/Home';

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
