import { createBrowserRouter, Navigate } from "react-router"; 
import RootLayout from "../layouts/RootLayout";
import Login from "../features/auth/components/Login";
import Signup from "../features/auth/components/Signup";
import ProtectedRoute from "./ProtectedRoute";
import ProjectFeed from "../features/projects/components/ProjectFeed";

const ProfilePlaceholder = () => <div className="p-8 font-semibold">Developer Profile Coming...</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProjectFeed />
      },
      {
        path: "profile/:id",
        element: <ProfilePlaceholder />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);