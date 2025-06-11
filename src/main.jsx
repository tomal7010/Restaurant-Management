import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomeLayout from './layout/HomeLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AuthLayout from './layout/AuthLayout.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import AllFoods from './pages/AllFoods.jsx'
import FoodDetails from './pages/FoodDetails.jsx'
import PurchasePage from './pages/PurchasePage.jsx'
import PrivateRoute from './provider/PrivateRoute.jsx'
import Gallery from './pages/Gallery.jsx'
import MyFoods from './pages/MyFoods.jsx'
import UpdateFood from './pages/UpdateFood.jsx'
import AddFood from './pages/AddFood.jsx'
import MyOrders from './pages/MyOrders.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children:[
        {
      path : "",
      element : <Home></Home>
    } 
      ]
  },

  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children : [
      {
        path: "/auth/login",
        element:<Login></Login>
        },
        {
        path: "/auth/register",
        element:<Register></Register>
        }
         ]
  },

  {
    path: "/allfoods",
    element: <AllFoods></AllFoods>
  },

   {
        path:"/food/:id",
        element: <FoodDetails></FoodDetails>
      },

      {
        path :"/purchase/:id",
        element :<PrivateRoute>
          <PurchasePage></PurchasePage>
        </PrivateRoute>
      },

      {
        path:"/gallery",
        element: <Gallery></Gallery>
      },

      {
        path :"/myFoods",
        element :<PrivateRoute>
          <MyFoods></MyFoods>
        </PrivateRoute>
      },

      {
        path :"/update-food/:id",
        element :<PrivateRoute>
          <UpdateFood></UpdateFood>
        </PrivateRoute>
      },

      {
        path :"/addfood",
        element :<PrivateRoute>
          <AddFood></AddFood>
        </PrivateRoute>
      },

      {
        path :"/myorders",
        element :<PrivateRoute>
          <MyOrders></MyOrders>
        </PrivateRoute>
      },
  
    {
    path: "/*",
    element: <h2>Error404</h2>
  },
  



])

createRoot(document.getElementById('root')).render(
  <StrictMode>


    <AuthProvider>


       <RouterProvider router={router} />


    </AuthProvider>

    
  </StrictMode>,
)
