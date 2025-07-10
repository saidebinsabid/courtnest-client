import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "../provider/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AdminRoute from "../routes/AdminRoute";
import ManageCourts from "../pages/Dashboard/ManageCourts";
import CourtPage from "../pages/CourtPage";
import ManageBookings from "../pages/Dashboard/ManageBookings";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/court',
        element: <CourtPage></CourtPage>,
      },
    ],
  },
  {
    path:'/auth',
    element:<AuthLayout></AuthLayout>,
    children:[
        {
            path:'/auth/login',
            element:<Login></Login>
        },
        {
            path:'/auth/register',
            element:<Register></Register>
        }
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        index:true,
        element: <DashboardHome></DashboardHome>
      },
      {
        path: 'manage-booking',
        element:<AdminRoute><ManageBookings></ManageBookings></AdminRoute>
      },
      {
        path: 'manage-court',
        element:<AdminRoute><ManageCourts></ManageCourts></AdminRoute>
      },
    ]

  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
