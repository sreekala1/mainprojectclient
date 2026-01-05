import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserHeader from './components/UserHeader'
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './pages/Homepage';
import ContactPage from './pages/ContactPage';
import "./styles/global.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MovieDetails from './pages/MovieDetails';
import AddMovie from './pages/AddMovie';
import AdminHeader from './components/AdminHeader';
import UserRoot from './layouts/UserRoot';
import AdminRoot from './layouts/AdminRoot';
import Ratings from './pages/Ratings';

import store from './app/store'
import { Provider } from 'react-redux'
import Login from './pages/Login';
import Register from './pages/Register';
import CareerPage from './pages/CareerPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserRoot />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "movie-details/:id",
        element: <MovieDetails />
      },
      {
        path: "ratings",
        element: <Ratings />
      },
       {
        path: "career",
        element: <CareerPage />
      },{
        path: "contact",
        element: <ContactPage />
      },
    ]
  },
  {
    path: "/admin/",
    element: <AdminRoot />,
    children: [
      {
        path: "add-movie",
        element: <AddMovie />
      }
    ]
  }
  
  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router = {router} />
    </Provider>
  </StrictMode>,
)
