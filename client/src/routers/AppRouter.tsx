import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Explore from "../pages/Explore";
import ManageItems from "../pages/ManageItems";
import ManageCategories from "../pages/ManageCategories";
import ManageUsers from "../pages/ManageUsers";
import Login from "../pages/Login";
import OrderHistory from "../pages/OrderHistory";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/items" element={<ManageItems />} />
      <Route path="/category" element={<ManageCategories />} />
      <Route path="/users" element={<ManageUsers />} />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRouter;
