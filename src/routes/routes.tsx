import { Navigate, RouteObject } from "react-router-dom";
import SignUpPartner from "../pages/partner webapp/authentication/SignUp";
import SignUpParent from "../pages/parent webapp/authentication/SignUp";
import Login from "../pages/partner webapp/authentication/Login";
import Dashboard from "../pages/partner webapp/app/dashboard";
import Error from "../pages/error";
import Invoices from "../pages/partner webapp/app/invoices";
import ParentList from "../pages/partner webapp/app/parentList";
import InviteParent from "../pages/partner webapp/invite parent";
import ParentDetails from "../pages/partner webapp/app/parentList/parent details";
import InvoiceDetails from "../pages/partner webapp/app/invoices/invoice details";
import ParentDashboard from "../pages/parent webapp/app/dashboard";
import LoginParent from "../pages/parent webapp/authentication/Login";
import ForgotPassword from "../pages/parent webapp/authentication/ForgotPassword";
// import PasswordReset from "../pages/parent webapp/authentication/PasswordReset";
import SetNewPassword from "../pages/parent webapp/authentication/SetNewPassword";
import CohortDetails from "../pages/partner webapp/app/dashboard/CohortDetails";

const routes: RouteObject[] = [
  //partner components
  { path: "/", element: <Navigate to="partner/login" replace={true} /> },
  { path: "/partner/signup", element: <SignUpPartner /> },
  { path: "/partner/login", element: <Login /> },
  { path: "/partner/dashboard", element: <Dashboard /> },
  { path: "/partner/cohort/:id", element: <CohortDetails /> },
  { path: "/partner/invoices", element: <Invoices /> },
  { path: "/partner/invoices/:id", element: <InvoiceDetails /> },
  { path: "/partner/parent-list", element: <ParentList /> },
  { path: "/partner/parent/:id/:cid", element: <ParentDetails /> },
  { path: "/partner/invite-parent", element: <InviteParent /> },

  // parent components/
  { path: "/partner/parent/login", element: <LoginParent /> },
  { path: "/partner/parent/register", element: <SignUpParent /> },
  { path: "/partner/parent/dashboard", element: <ParentDashboard /> },

  //Forgot password
  { path: ":player/forgot-password", element: <ForgotPassword /> },
  // { path: "/partner/parent/password-reset", element: <PasswordReset /> },
  { path: ":player/:email/set-password", element: <SetNewPassword /> },

  //error path
  { path: "*", element: <Error /> },
];

export { routes };
