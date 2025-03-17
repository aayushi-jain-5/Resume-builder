import Home from "@/pages/Home";
import About from "@/pages/About";
import Resume from "@/pages/Resume";
import Template from "@/pages/Template";
import { DashboardLayout } from "@/Layout/DashboardLayout";
import Resume2 from "@/pages/Resume2";
import Resume3 from "@/pages/Resume3";
import Resume4 from "@/pages/Resume4";
import { SignUp } from "@/pages/SignUp";
import { Login } from "@/pages/Login";
import { ForgotPassword } from "@/pages/ForgotPassword";

export default function Routes() {
  return {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "home",
        element: <Template />,
      },
      {
        path: "/home/resume",
        element: <Resume />,
      },
      {
        path: "/home/resume2",
        element:<Resume2/>
      },
      {
        path: "/home/resume3",
        element:<Resume3/>
      },
      {
        path: "/home/resume4",
        element:<Resume4/>
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  };
}
