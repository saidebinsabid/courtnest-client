import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../provider/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import MemberRoute from "../routes/MemberRoute";
import UserRoute from "../routes/UserRoute";
import Loading from "../components/Loading";

// Eagerly load most-visited pages
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

// Lazily load all other pages
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const DashboardHome = lazy(() => import("../pages/Dashboard/DashboardHome"));
const ManageCourts = lazy(() => import("../pages/Dashboard/ManageCourts"));
const CourtPage = lazy(() => import("../pages/CourtPage"));
const ManageBookings = lazy(() => import("../pages/Dashboard/ManageBookings"));
const PendingBookings = lazy(() => import("../pages/Dashboard/PendingBookings"));
const UserProfile = lazy(() => import("../pages/Dashboard/UserProfile"));
const MemberProfile = lazy(() => import("../pages/Dashboard/MemberProfile"));
const AdminProfile = lazy(() => import("../pages/Dashboard/AdminProfile"));
const ManageMembers = lazy(() => import("../pages/Dashboard/ManageMembers"));
const AllUsers = lazy(() => import("../pages/Dashboard/AllUsers"));
const ApprovedBookings = lazy(() => import("../pages/Dashboard/ApprovedBookings"));
const Payment = lazy(() => import("../pages/Payment"));
const ConfirmedBooking = lazy(() => import("../pages/Dashboard/ConfirmedBooking"));
const AdminConfirmedBooking = lazy(() => import("../pages/Dashboard/AdminConfirmedBooking"));
const PaymentHistory = lazy(() => import("../pages/Dashboard/PaymentHistory"));
const ManageCoupon = lazy(() => import("../pages/Dashboard/ManageCoupon"));
const ManageAnnouncement = lazy(() => import("../pages/Dashboard/ManageAnnouncement"));
const UserAnnouncement = lazy(() => import("../pages/Dashboard/UserAnnouncement"));
const MemberAnnouncement = lazy(() => import("../pages/Dashboard/MemberAnnouncement"));
const About = lazy(() => import("../pages/About"));
const Forbidden = lazy(() => import("../pages/Forbidden"));
const AllAnnouncement = lazy(() => import("../pages/AllAnnouncement"));

// Suspense wrapper helper
const Lazy = ({ children }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);



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
        element: <Lazy><CourtPage></CourtPage></Lazy>,
      },
      {
        path: '/about-us',
        element: <Lazy><About></About></Lazy>,
      },
      {
        path: '/all-announcement',
        element: <Lazy><AllAnnouncement></AllAnnouncement></Lazy>,
      },
      {
        path: '/forbidden',
        element: <Lazy><Forbidden></Forbidden></Lazy>,
      },
    ],
  },
  {
    path:'/auth',
    element:<AuthLayout></AuthLayout>,
    children:[
        {
            path:'/auth/login',
            element:<Lazy><Login></Login></Lazy>
        },
        {
            path:'/auth/register',
            element:<Lazy><Register></Register></Lazy>
        }
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><Lazy><DashboardLayout></DashboardLayout></Lazy></PrivateRoute>,
    children:[
      {
        index:true,
        element: <Lazy><DashboardHome></DashboardHome></Lazy>
      },
      // User Routes
      {
        path: 'user/profile',
        element:<UserRoute><Lazy><UserProfile></UserProfile></Lazy></UserRoute>
      },
      {
        path: 'user/pending-booking',
        element:<UserRoute><Lazy><PendingBookings></PendingBookings></Lazy></UserRoute>
      },
      {
        path: 'user/update-announcement',
        element:<UserRoute><Lazy><UserAnnouncement></UserAnnouncement></Lazy></UserRoute>
      },
      // Member Routes
      {
        path: 'member/profile',
        element:<MemberRoute><Lazy><MemberProfile></MemberProfile></Lazy></MemberRoute>
      },
      {
        path: 'member/pending-booking',
        element:<MemberRoute><Lazy><PendingBookings></PendingBookings></Lazy></MemberRoute>
      },
      {
        path: 'member/approved-booking',
        element:<MemberRoute><Lazy><ApprovedBookings></ApprovedBookings></Lazy></MemberRoute>
      },
      {
        path: 'member/confirmed-booking',
        element:<MemberRoute><Lazy><ConfirmedBooking></ConfirmedBooking></Lazy></MemberRoute>
      },
      {
        path: 'member/payment/:id',
        element:<MemberRoute><Lazy><Payment></Payment></Lazy></MemberRoute>
      },
      {
        path: 'member/payment-history',
        element:<MemberRoute><Lazy><PaymentHistory></PaymentHistory></Lazy></MemberRoute>
      },
      {
        path: 'member/all-announcement',
        element:<MemberRoute><Lazy><MemberAnnouncement></MemberAnnouncement></Lazy></MemberRoute>
      },
      // Admin Routes
      {
        path: 'admin/profile',
        element:<AdminRoute><Lazy><AdminProfile></AdminProfile></Lazy></AdminRoute>
      },
      {
        path: 'manage-booking',
        element:<AdminRoute><Lazy><ManageBookings></ManageBookings></Lazy></AdminRoute>
      },
      {
        path: 'manage-user',
        element:<AdminRoute><Lazy><ManageMembers></ManageMembers></Lazy></AdminRoute>
      },
      {
        path: 'all-user',
        element:<AdminRoute><Lazy><AllUsers></AllUsers></Lazy></AdminRoute>
      },
      {
        path: 'manage-court',
        element:<AdminRoute><Lazy><ManageCourts></ManageCourts></Lazy></AdminRoute>
      },
      {
        path: 'admin/confirmed-booking',
        element:<AdminRoute><Lazy><AdminConfirmedBooking></AdminConfirmedBooking></Lazy></AdminRoute>
      },
      {
        path: 'admin/manage-coupon',
        element:<AdminRoute><Lazy><ManageCoupon></ManageCoupon></Lazy></AdminRoute>
      },
      {
        path: 'admin/manage-announcement',
        element:<AdminRoute><Lazy><ManageAnnouncement></ManageAnnouncement></Lazy></AdminRoute>
      },
    ]

  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
