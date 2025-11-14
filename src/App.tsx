import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import CustomerOrders from "./pages/CustomerOrders";
import ChefOrders from "./pages/ChefOrders";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import UserMenu from "./pages/UserMenu";
import OrderForm from "./pages/OrderForm";
import ConfirmOrder from "./pages/ConfirmOrder";
import OrderConfirmed from "./pages/OrderConfirmed";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/customer-orders" element={<CustomerOrders />} />
      <Route path="/chef-orders" element={<ChefOrders />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chef/:chefSlug" element={<UserMenu />} />
      <Route path="/order/:chefSlug/:mealSlug" element={<OrderForm />} />
      <Route path="/confirm-order" element={<ConfirmOrder />} />
      <Route path="/order-confirmed" element={<OrderConfirmed />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
