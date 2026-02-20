import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Explore from "../pages/Explore";
import ManageItems from "../pages/ManageItems";
import ManageCategories from "../pages/ManageCategories";
import ManageUsers from "../pages/ManageUsers";
import Login from "../pages/Login";
import OrderHistory from "../pages/OrderHistory";
import { useContext } from "react";
import { AppContext } from "../context";
import NotFound from "../pages/NotFound";

const LoginRoute = ({ element }: { element: React.ReactNode }) => {
  const { auth } = useContext(AppContext);
  if (auth.token) {
    return <Navigate to="/dashboard" replace />;
  }
  return element;
};

const ProtectedRoutes = ({
  element,
  allowedRoles,
}: {
  element: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { auth } = useContext(AppContext);
  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.userRole || "")) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Protected routes accessible to all authenticated users */}
      <Route
        path="/dashboard"
        element={<ProtectedRoutes element={<Dashboard />} />}
      />
      <Route
        path="/explore"
        element={<ProtectedRoutes element={<Explore />} />}
      />
      <Route
        path="/orders"
        element={<ProtectedRoutes element={<OrderHistory />} />}
      />

      {/* Admin only routes */}
      <Route
        path="/category"
        element={
          <ProtectedRoutes
            element={<ManageCategories />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoutes
            element={<ManageUsers />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        }
      />
      <Route
        path="/items"
        element={
          <ProtectedRoutes
            element={<ManageItems />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        }
      />

      {/* Public routes */}
      <Route path="/login" element={<LoginRoute element={<Login />} />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
