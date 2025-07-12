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
import MemberRoute from "../routes/MemberRoute";
import UserRoute from "../routes/UserRoute";
import ManageCourts from "../pages/Dashboard/ManageCourts";
import CourtPage from "../pages/CourtPage";
import ManageBookings from "../pages/Dashboard/ManageBookings";
import PendingBookings from "../pages/Dashboard/PendingBookings";
import UserProfile from "../pages/Dashboard/UserProfile";
import MemberProfile from "../pages/Dashboard/MemberProfile";
import AdminProfile from "../pages/Dashboard/AdminProfile";
import ManageMembers from "../pages/Dashboard/ManageMembers";
import AllUsers from "../pages/Dashboard/AllUsers";
import ApprovedBookings from "../pages/Dashboard/ApprovedBookings";
import Payment from "../pages/Payment";
import ConfirmedBooking from "../pages/Dashboard/ConfirmedBooking";
import AdminConfirmedBooking from "../pages/Dashboard/AdminConfirmedBooking";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import ManageCoupon from "../pages/Dashboard/ManageCoupon";
import ManageAnnouncement from "../pages/Dashboard/ManageAnnouncement";
import UserAnnouncement from "../pages/Dashboard/UserAnnouncement";
import MemberAnnouncement from "../pages/Dashboard/MemberAnnouncement";



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
      // User Routes
      {
        path: 'user/profile',
        element:<UserRoute><UserProfile></UserProfile></UserRoute>
      },
      {
        path: 'user/pending-booking',
        element:<UserRoute><PendingBookings></PendingBookings></UserRoute>
      },
      {
        path: 'user/update-announcement',
        element:<UserRoute><UserAnnouncement></UserAnnouncement></UserRoute>
      },
      // Member Routes
      {
        path: 'member/profile',
        element:<MemberRoute><MemberProfile></MemberProfile></MemberRoute>
      },
      {
        path: 'member/pending-booking',
        element:<MemberRoute><PendingBookings></PendingBookings></MemberRoute>
      },
      {
        path: 'member/approved-booking',
        element:<MemberRoute><ApprovedBookings></ApprovedBookings></MemberRoute>
      },
      {
        path: 'member/confirmed-booking',
        element:<MemberRoute><ConfirmedBooking></ConfirmedBooking></MemberRoute>
      },
      {
        path: 'member/payment/:id',
        element:<MemberRoute><Payment></Payment></MemberRoute>
      },
      {
        path: 'member/payment-history',
        element:<MemberRoute><PaymentHistory></PaymentHistory></MemberRoute>
      },
      {
        path: 'member/all-announcement',
        element:<MemberRoute><MemberAnnouncement></MemberAnnouncement></MemberRoute>
      },
      // Admin Routes
      {
        path: 'admin/profile',
        element:<AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: 'manage-booking',
        element:<AdminRoute><ManageBookings></ManageBookings></AdminRoute>
      },
      {
        path: 'manage-user',
        element:<AdminRoute><ManageMembers></ManageMembers></AdminRoute>
      },
      {
        path: 'all-user',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'manage-court',
        element:<AdminRoute><ManageCourts></ManageCourts></AdminRoute>
      },
      {
        path: 'admin/confirmed-booking',
        element:<AdminRoute><AdminConfirmedBooking></AdminConfirmedBooking></AdminRoute>
      },
      {
        path: 'admin/manage-coupon',
        element:<AdminRoute><ManageCoupon></ManageCoupon></AdminRoute>
      },
      {
        path: 'admin/manage-announcement',
        element:<AdminRoute><ManageAnnouncement></ManageAnnouncement></AdminRoute>
      },
    ]

  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
