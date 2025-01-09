import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import AllNotes from './Pages/AllNotes';
import CreateNotes from './Pages/CreateNotes';
import Note from './Pages/Note';
import Homelayout from './Pages/Homelayout';
import Home from './Pages/Home';
import Privateroute from './components/Privateroute';

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
        element: <Privateroute><AllNotes /></Privateroute> ,
      },
      {
        path: '/createnote',
        element: <Privateroute><CreateNotes /></Privateroute>,
      },
      {
        path: '/notes/:id',
        element: <Privateroute><Note /></Privateroute>,
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
